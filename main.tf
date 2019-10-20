variable "region" {
  default = "eu-west-2"
}

variable "bucket_name" {
  default = "my-heapdump-s3-bucket"
}

provider "aws" {
  region = "${var.region}"
}

resource "aws_kms_key" "heapdump-key" {
  description             = "This key is used to encrypt heapdumps"
  deletion_window_in_days = 10
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket_name}"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = "${aws_kms_key.heapdump-key.arn}"
        sse_algorithm     = "aws:kms"
      }
    }
  }

  tags = {
    Name        = "${var.bucket_name}"
    Environment = "Dev"
  }
}
