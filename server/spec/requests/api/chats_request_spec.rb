# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chats', type: :request do
  let!(:users) { FactoryBot.create(:user, nickname: "Tom") }
  let!(:chats) { create_list(:chat, 5) }
  describe 'retrieves all chats' do
    before do
      get '/api/chats'
    end

    it 'returns chats' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

end
