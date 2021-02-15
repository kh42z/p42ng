# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "GuildOfficers", type: :request do

  describe 'retrieves all officers of specific guild' do
    let(:guilds) { create_list(:guild_with_officers, 2) }
    before do
      get api_guild_guild_officers_path(guilds)
    end

    it 'returns guild officers' do
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
      expect(response).to have_http_status(200)
    end
  end

  describe 'create one officer' do
    before {
      user = create(:user)
      guild = create(:guild)
      put "/api/guilds/#{guild.id}/guild_officers/#{user.id}"
    }
    it 'returns new officers' do
      expect(GuildOfficer.all.count).to eq(1)
    end
    it 'returns status code 201' do
      expect(response).to have_http_status(201)
    end
  end

  describe 'delete one officer' do
    before {
      guild = create(:guild_with_officers)
      delete "/api/guilds/#{guild.id}/guild_officers/#{guild.guild_officers.first.user_id}"
    }
    it 'returns new officers' do
      expect(GuildOfficer.all.count).to eq(1)
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
