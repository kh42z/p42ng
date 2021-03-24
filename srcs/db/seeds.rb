# frozen_string_literal: true

require 'faker'
require 'factory_bot_rails'

Ladder.create(name: 'Bronze', desc: 'meh.')
Ladder.create(name: 'Silver', desc: 'hem.')
Ladder.create(name: 'Gold', desc: 'ehm.')
Ladder.create(name: 'Platine', desc: 'mhe.')
Ladder.create(name: 'Diamond', desc: 'mhe.')

alfred = FactoryBot.create(:user, nickname: 'Alfred', email: '9000@student.42.fr', two_factor: true, two_factor_code: ENV['ALFRED_CODE'])
general_chat_room = Chat.create(name: 'general', privacy: 'public', owner: alfred)
ChatParticipant.create(user: alfred, chat: general_chat_room)

if Rails.env.development?

  guilds = FactoryBot.create_list(:guild, 5)
  guilds.each do |guild|
    @users = FactoryBot.create_list(:user, 5)
    FactoryBot.create(:guild_member, guild: guild, rank: 'owner', user: @users[0])
    1.upto(2) do |i|
      FactoryBot.create(:guild_member, guild: guild, rank: 'officer', user: @users[i])
    end
    3.upto(4) do |i|
      FactoryBot.create(:guild_member, guild: guild, user: @users[i])
    end
    chat = FactoryBot.create(:chat, owner: @users[0])
    1.upto(4) do |i|
      FactoryBot.create(:chat_participant, user: @users[i], chat: chat)
    end
    guilds.without(guild).each do |on|
      FactoryBot.create(:war, from: guild, on: on, war_start: DateTime.now + rand(-5..5), war_end: DateTime.now + rand(6..10))
    end
  end

  10.times do |_i|
    players = @users.sample(2)
    FactoryBot.create(:game, winner: players[0], player_left: players[0], player_right: players[1], mode: 'ladder',
                             status: 'played')
  end

  User.all.each do |t|
    t.update!(ladder_id: Ladder.all.sample.id)
  end
end
