const enabled = process.env.HEAPDUMP_ENABLED;
const logEnabled = process.env.HEAPDUMP_LOG_ENABLED;
const logJson = process.env.HEAPDUMP_LOG_JSON;

function log(...entry) {
  if (logEnabled) {
    logJson ? console.log(`{"component":"heapdump-s3","msg":"${entry}"}`) : console.log(...entry);
  }
}

log(`heapdump is ${enabled ? "enabled" : "disabled"}`);

if (enabled) {
  const fs = require('fs');
  const os = require('os');
  const heapdump = require('heapdump');
  const S3 = require('aws-sdk/clients/s3');
  const period = process.env.HEAPDUMP_PERIOD_MINS || 120;
  const bucket = process.env.HEAPDUMP_BUCKET_NAME;
  const prefix = `${os.hostname}-${os.type}`;

  log(`heapdump will be taken every ${period} minutes`);
  setInterval(() => {
    log("starting heapdump");
    heapdump.writeSnapshot((err, filename) => {
      log(`heapdump written to ${filename}`);

      const s3 = new S3();
      const upload = new S3.ManagedUpload({
        service: s3,
        params: {
          Bucket: bucket,
          Key: `${prefix}/${filename}`,
          Body: fs.createReadStream(filename)
        }
      });

      upload.send((err, response) => {
        if (err) {
          log('error uploading ${err}');
          logEnabled ? true : console.error(err);
          throw err;
        }
        log(`heapdump uploaded to ${response.Location}`);
      });
    });
  }, period * 60000);
}