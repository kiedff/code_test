class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates :lat, :lng, :image, presence: true
  validates :lat, :lng, numericality: true
end
