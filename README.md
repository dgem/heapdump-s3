# heapdump-s3
periodically takes a heapdump and copies it to a s3 bucket of your choosing

## Setup

An example terraform (#main.tf) can be run, it is highly recommended to constrain access to the bucket and use serverside encryption!

## Try it locally
```
$ HEAPDUMP_BUCKET_NAME=my-heapdump-s3-bucket HEAPDUMP_PERIOD_MINS=60 HEAPDUMP_LOG_JSON=true HEAPDUMP_LOG_ENABLED=true HEAPDUMP_ENABLED=true node index.js
{"component":"heapdump-s3","msg":"heapdump is enabled"}
{"component":"heapdump-s3","msg":"heapdump will be taken every 60 minutes"}
{"component":"heapdump-s3","msg":"starting heapdump"}
{"component":"heapdump-s3","msg":"heapdump written to heapdump-277634093.58732.heapsnapshot"}
{"component":"heapdump-s3","msg":"heapdump uploaded to https://my-heapdump-s3-bucket.s3.eu-west-2.amazonaws.com/***-***/heapdump-277634093.58732.heapsnapshot"}
```