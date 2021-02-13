# frozen_string_literal: true

require 'faker'
require 'factory_bot_rails'

Ladder.create(name: 'Bronze', desc: 'meh.')
Ladder.create(name: 'Silver', desc: 'hem.')
Ladder.create(name: 'Gold', desc: 'ehm.')
Ladder.create(name: 'Platine', desc: 'mhe.')
Ladder.create(name: 'Diamond', desc: 'mhe.')

State.create(name: 'Offline')
State.create(name: 'Online')
State.create(name: 'In Game')

if Rails.env.development?
(1..20).each do
  FactoryBot.create(:user)
end

(1..20).each do
  Chat.create!(
    privacy: Faker::Number.leading_zero_number(digits: 3),
    password: "password",
    owner_id: rand(1..5)
    )
end

(1..5).each do
  FactoryBot.create(:guild_with_officers)
end



(1..20).each do |id|
  User.find(id).update!(guild: Guild.find(rand(1..5)))
end
end