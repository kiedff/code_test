require 'rails_helper'

RSpec.describe Photo, type: :model do 
  let(:photo) { create :photo }

  it 'has a latitude' do
    expect(photo.lat).to eq 1.5
  end

  it 'has a longitude' do
    expect(photo.lng).to eq 1.5
  end

  it 'has an image' do
    expect(photo.image).to eq 'MyString'
  end
end
