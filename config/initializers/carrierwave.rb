CarrierWave.configure do |config|
  config.storage = Rails.env.production? ? :fog : :file

  config.fog_credentials = {
    provider:              'AWS',  
    aws_access_key_id:     ENV['AWS_ACCESS_KEY_ID'],       
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'], 
    region:                'eu-west-2',  
    host:                  's3.example.com'
  }
  config.fog_directory = ENV['S3_BUCKET'] 
  config.fog_public = false
end

 