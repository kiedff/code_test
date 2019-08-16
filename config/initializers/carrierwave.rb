CarrierWave.configure do |config|
  config.storage    =  :aws                  # required
  config.aws_bucket =  ENV['S3_BUCKET']      # required
  config.aws_acl    =  :public_read

  config.aws_credentials = {
    access_key_id:      ENV['AWS_ACCESS_KEY_ID'],       # required
    secret_access_key:  ENV['AWS_SECRET_ACCESS_KEY'],     # required
    region: 'eu-west-2'
  }
end