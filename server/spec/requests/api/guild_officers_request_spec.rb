# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "GuildOfficers", type: :request do
  let!(:guild) { FactoryBot.create(:guild, name: "YouThink", anagram: "YITOK") }
  let!(:user) { FactoryBot.create(:user, nickname: "Tom") }
  let!(:guild_officers) { FactoryBot.create(:guild_officer, guild_id: guild.id, user_id: user.id) }
  describe 'retrieves all officers of specific guild' do
    before do
      get api_guild_guild_officers_path(guild_id: guild.id)
    end

    it 'returns guild officers' do
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'create one officer' do
    before {
      newUser = FactoryBot.create(:user)
      put "/api/guilds/#{Guild.first.id}/guild_officers/#{newUser.id}"
    }

    it 'returns new officer' do
      expect(GuildOfficer.all.count).to eq(2)
    end

    it 'returns status code 201' do
      expect(response).to have_http_status(201)
    end
  end

  describe 'delete one officer' do
    before {
      delete "/api/guilds/#{Guild.first.id}/guild_officers/#{Guild.first.guild_officers.first.user_id}"
    }
    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
