# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ladder, type: :model do

  it 'should create what I desire most' do
    Ladder.create(name: 'Bronze', desc: 'meh.')
    Ladder.create(name: 'Silver', desc: 'hem.')
    Ladder.create(name: 'Gold', desc: 'ehm.')
    Ladder.create(name: 'Platine', desc: 'mhe.')
    Ladder.create(name: 'Diamond', desc: 'mhe.')
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
    User.all.each do |t|
      t.update!(ladder_id: Ladder.all.sample.id)
    end
    expect(War.count).to eq 20
  end
end