class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates :lat, :lng, presence: true
  validates :lat, :lng, numericality: true
end
