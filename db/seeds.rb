# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
photo1 = Photo.create!(lat: 55.9457, lng: 3.9925)
photo2 = Photo.create!(lat: 56.1165, lng: 3.9369)
photo3 = Photo.create!(lat: 55.9533, lng: 3.1883)
photo4 = Photo.create!(lat: 55.8642, lng: 4.2518)
photo5 = Photo.create!(lat: 51.5074, lng: 0.1278)
photo6 = Photo.create!(lat: 56.4620, lng: 2.9707)
photo7 = Photo.create!(lat: 54.9783, lng: 1.6178)
photo8 = Photo.create!(lat: 57.1497, lng: 2.0943)
photo9 = Photo.create!(lat: 56.0032, lng: 3.8877)
photo10 = Photo.create!(lat: 56.0097, lng: 3.7228)
photo11 = Photo.create!(lat: 56.1141, lng: 3.7919)

photo1.image = File.open(File.join(Rails.root, "db/images/1.jpg"))
photo1.save!
photo2.image = File.open(File.join(Rails.root, "db/images/2.jpg"))
photo2.save!
photo3.image = File.open(File.join(Rails.root, "db/images/3.jpeg"))
photo3.save!
photo4.image = File.open(File.join(Rails.root, "db/images/4.jpg"))
photo4.save!
photo5.image = File.open(File.join(Rails.root, "db/images/5.jpg"))
photo5.save!
photo6.image = File.open(File.join(Rails.root, "db/images/6.jpg"))
photo6.save!
photo7.image = File.open(File.join(Rails.root, "db/images/7.jpg"))
photo7.save!
photo8.image = File.open(File.join(Rails.root, "db/images/8.jpg"))
photo8.save!
photo9.image = File.open(File.join(Rails.root, "db/images/9.jpg"))
photo9.save!
photo10.image = File.open(File.join(Rails.root, "db/images/10.jpg"))
photo10.save!
photo11.image = File.open(File.join(Rails.root, "db/images/11.jpg"))