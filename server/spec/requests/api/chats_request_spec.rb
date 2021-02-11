# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chats', type: :request do
  let!(:chats) { create_list(:chat, 2) }
  let!(:chat_id) { chats.first.id }
  let!(:user_id) { chats.first.owner }
  describe 'retrieves all chats' do
    before do
      get '/api/chats'
    end
    it 'returns chats' do
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'retrieves one chat' do
    before { get "/api/chats/#{chat_id}" }
    it 'returns chats' do
      expect(json).not_to be_empty
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  #  describe 'creates a chat' do
#   before { post "/api/chats/", params: { 'privacy' => 0 } }
#
#   it 'returns status code 201' do
#     expect(response).to have_http_status(201)
#   end
# end

 describe 'delete a chat' do
   before { delete "/api/chats/#{chat_id}" }
   it 'returns status code 204' do
     expect(response).to have_http_status(204)
   end
 end
end
