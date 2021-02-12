# frozen_string_literal: true

require 'rails_helper'

describe 'Guild API', type: :request do
  let!(:guilds) { create_list(:guild, 5) }
  let!(:users) { create_list(:user, 5) }
  let!(:guild_id) { guilds.first.id }
  let!(:valid_attributes) { {name: 'Updated', anagram: 'upd4t',
                             owner_id: User.first.id,
                             officer_ids: [FactoryBot.create(:user).id, FactoryBot.create(:user).id]} }
  describe 'GET /guilds' do
    before do
      get '/api/guilds'
    end

    it 'returns all guilds' do
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(5)
    end

    describe 'Update one guild' do
      before {
        put "/api/guilds/#{guild_id}", params: valid_attributes
      }

      it 'owner_id to be update' do
        expect(Guild.find(guild_id).name).to eq('Updated')
        expect(Guild.find(guild_id).guild_officers.count).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    describe 'delete one guild' do
      before {
        delete "/api/guilds/#{guild_id}"
      }
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end
end
