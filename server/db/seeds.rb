# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Ladder.create(name: 'Bronze', desc: 'meh.', mmr_threshold: 200)
Ladder.create(name: 'Silver', desc: 'hem.', mmr_threshold: 400)
Ladder.create(name: 'Gold', desc: 'ehm.', mmr_threshold: 600)
Ladder.create(name: 'Platine', desc: 'mhe.', mmr_threshold: 800)
Ladder.create(name: 'Diamond', desc: 'mhe.', mmr_threshold: 1000)

(1..20).each do |id|
    User.create!(
      nickname: Faker::Name.unique.name,
      image_url: Faker::Internet.url,
      two_factor: 1,
      status: 0,
      password: Faker::Internet.password,
      email: Faker::Internet.email,
      mmr: mmr_ = %w[200 400 600 800 1000].sample,
      ladder_id: rand(1..5)
    )
end

(1..5).each do |id|
  Chat.create!(
    id: id,
    privacy: Faker::Number.leading_zero_number(digits: 3),
    password: "password",
    owner_id: rand(1..20),
    )
end

(1..5).each do |id|
  Guild.create!(
    id: id,
    name: Faker::Name.unique.name,
    anagram: Faker::Name.unique.initials(number: 5),
    owner_id: id
    )
end

(1..20).each do |id|
  User.find(id).update!(guild: Guild.find(rand(1..5)))
end
