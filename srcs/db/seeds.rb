# frozen_string_literal: true

require 'faker'
require 'factory_bot_rails'

Ladder.create(name: 'Bronze', desc: 'meh.')
Ladder.create(name: 'Silver', desc: 'hem.')
Ladder.create(name: 'Gold', desc: 'ehm.')
Ladder.create(name: 'Platine', desc: 'mhe.')
Ladder.create(name: 'Diamond', desc: 'mhe.')

alfred = FactoryBot.create(:user, nickname: 'Alfred', email: '9000@student.42.fr',
                                  image_url: 'https://res.cloudinary.com/practicaldev/image/fetch/s--yjlrbrT6--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/rlyibpr58qk49ci8y1rk.png', two_factor: true, two_factor_code: ENV['ALFRED_CODE'])
general_chat_room = Chat.create(name: 'general', privacy: 'public', owner_id: alfred.id)
ChatParticipant.create(user: alfred, chat: general_chat_room)

if Rails.env.development?

  user = FactoryBot.create_list(:user, 5)
  guild = FactoryBot.create(:guild)
  FactoryBot.create(:guild_member, guild: guild, rank: 'owner', user: user[0])
  1.upto(2) do |i|
    FactoryBot.create(:guild_member, guild: guild, rank: 'officer', user: user[i])
  end
  3.upto(4) do |i|
    FactoryBot.create(:guild_member, guild: guild, user: user[i])
  end

  3.times do |i|
    chat = FactoryBot.create(:chat, owner: user[i])
    FactoryBot.create_list(:chat_participant, 3, chat: chat)
  end

  10.times do |_i|
    winner = User.find(0..7)
    FactoryBot.create(:game, winner: winner, player_left: winner, player_right: User.find(8..15), game_type: 'ladder')
  end
end
