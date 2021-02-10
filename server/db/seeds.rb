# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'factory_bot_rails'

Ladder.create(name: 'Bronze', desc: 'meh.')
Ladder.create(name: 'Silver', desc: 'hem.')
Ladder.create(name: 'Gold', desc: 'ehm.')
Ladder.create(name: 'Platine', desc: 'mhe.')
Ladder.create(name: 'Diamond', desc: 'mhe.')

(1..20).each do |id|
  FactoryBot.create(:user)
end

(1..5).each do |id|
  Chat.create!(
    id: id,
    privacy: Faker::Number.leading_zero_number(digits: 3),
    password: "password",
    owner_id: rand(1..20)
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
