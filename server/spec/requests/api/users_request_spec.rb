# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let!(:users) { create_list(:user, 10) }
  let!(:ladders) { create_list(:ladder, 10) }
  let!(:ladder_id) { ladders.first.id }
  let!(:guilds) { create_list(:guild, 10) }
  let!(:guild_id) { guilds.first.id }
  let!(:user_id) { users.first.id }

  describe 'retrieves all users' do
    before { get '/api/users' }
    it 'returns users' do
      expect(json).not_to be_empty
      expect(json.size).to eq(20)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'retrieves one user' do
    before { get "/api/users/#{user_id}" }
    it 'returns user' do
      expect(json).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

#   describe 'creates one user' do
#     before { post '/api/users', params: valid_user.as_json }
#     it 'create an user' do
#       expect(json).not_to be_empty
#     end
#
#     it 'returns status code 201' do
#       expect(response).to have_http_status(201)
#     end
#   end
#
#   describe 'modifies one user' do
#     before { patch "/api/users/#{user_id}", params: { 'nickname' => 'Michel' } }
#     it 'update user' do
#       expect(json).not_to be_empty
#     end
#
#     it 'returns status code 200' do
#       expect(response).to have_http_status(200)
#     end
#   end

  describe 'delete one user' do
    before { delete "/api/users/#{user_id}" }
    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end