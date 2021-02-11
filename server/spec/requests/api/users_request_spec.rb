# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let!(:users) { create_list(:user, 10) }
  let!(:states) { create_list(:state, 3)}
  let!(:ladders) { create_list(:ladder, 5)}
  let!(:first) { users.first }
  let!(:user_id) { users.last.id }

  describe 'requires auth token' do
    before { get '/api/users' }
    it 'returns status code 401' do
      expect(response).to have_http_status(401)
    end
  end

  describe 'retrieves all users' do
    before { get '/api/users', headers: first.create_new_auth_token }
    #    before { get '/api/users', headers: users.first.create_new_auth_token }
    it 'returns users' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'retrieves one user' do
    before {
      get "/api/users/#{user_id}", headers: first.create_new_auth_token
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
      patch "/api/users/#{user_id}", params: { 'nickname' => 'Michel' }, headers: first.create_new_auth_token
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
      delete "/api/users/#{user_id}", headers: first.create_new_auth_token
    }
    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end