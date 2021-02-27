# frozen_string_literal: true

require 'faker'
require 'factory_bot_rails'

Ladder.create(name: 'Bronze', desc: 'meh.')
Ladder.create(name: 'Silver', desc: 'hem.')
Ladder.create(name: 'Gold', desc: 'ehm.')
Ladder.create(name: 'Platine', desc: 'mhe.')
Ladder.create(name: 'Diamond', desc: 'mhe.')

alfred = FactoryBot.create(:user, nickname: "Alfred", email: "9000@student.42.fr", image_url: "https://res.cloudinary.com/practicaldev/image/fetch/s--yjlrbrT6--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/rlyibpr58qk49ci8y1rk.png", two_factor: true, two_factor_code: ENV["ALFRED_CODE"])
general_chat_room = Chat.create(privacy: 'public')
ChatParticipant.create(user: alfred, chat: general_chat_room)

if Rails.env.development?

  FactoryBot.create_list(:user, 20)
  FactoryBot.create_list(:guild_with_officers, 5)
  FactoryBot.create_list(:chat, 2)

  def chat_with_participants(count: 1)
    FactoryBot.create(:chat) do |chat|
      FactoryBot.create_list(:chat_participant, count, chat: chat)
    end
  end
  chat_with_participants(count: 2)

  (1..20).each do |id|
    User.find(id).update!(guild: Guild.find(rand(1..5)))
  end

  (1..20).each do |id|
    winner = User.find(rand(1..20))
    FactoryBot.create(:game, winner: winner, player_left: winner, player_right: User.find(rand(1..20)), game_type: 'ladder')
  end

end