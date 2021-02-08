# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let!(:users) { create_list(:user, 10) }
  let!(:ladders) { create_list(:ladder, 10) }
  let!(:ladder_id) { ladders.first.id }
  let!(:guilds) { create_list(:guild, 10) }
  let!(:guild_id) { guilds.first.id }
  let!(:user_id) { users.first.id }

  describe 'requires auth token' do
    before {
      get '/api/users'
    }

    it 'returns status code 401' do
      expect(response).to have_http_status(401)
    end
  end

  describe 'retrieves all users' do
    before {
      @user = FactoryBot.create(:user)
      get '/api/users', headers: @user.create_new_auth_token
    }
    it 'returns users' do
      expect(json).not_to be_empty
      expect(json.size).to eq(21)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'retrieves one user' do
    before {
      @user = FactoryBot.create(:user)
      get "/api/users/#{user_id}", headers: @user.create_new_auth_token
    }
    it 'returns user' do
      expect(json).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'modifies one user' do
    before {
      @user = FactoryBot.create(:user)
      patch "/api/users/#{user_id}", params: { 'nickname' => 'Michel' }, headers: @user.create_new_auth_token
    }
    it 'update user' do
      expect(json).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
     end
   end

  describe 'delete one user' do
    before {
      @user = FactoryBot.create(:user)
      delete "/api/users/#{user_id}", headers: @user.create_new_auth_token
    }
    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end