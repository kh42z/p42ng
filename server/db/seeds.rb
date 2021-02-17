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

  FactoryBot.create_list(:user, 5)
  FactoryBot.create_list(:guild_with_officers, 2)
  FactoryBot.create_list(:chat, 2)

  def chat_with_participants(count: 1)
    FactoryBot.create(:chat) do |chat|
      FactoryBot.create_list(:chat_participant, count, chat: chat)
    end
  end
  chat_with_participants(count: 2)

  #  (1..20).each do |id|
#    User.find(id).update!(guild: Guild.find(rand(1..5)))
#  end

  (1..20).each do |id|
    FactoryBot.create(:gameRecord, winner: User.find(rand(1..20)), looser: User.find(rand(1..20)))
  end

end