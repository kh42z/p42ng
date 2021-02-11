# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "ChatAdmins", type: :request do
  let!(:user_1) { create(:user, nickname: "Tom") }
  let!(:user_2) { create(:user, nickname: "Mark") }
  let!(:chat) { create(:chat, privacy: 0, password_digest: Faker::Internet.password, owner: user_1) }
  let!(:chat_admins) {
  create(:chat_admin, user_id: user_1.id, chat_id: chat.id)
  create(:chat_admin, user_id: user_2.id, chat_id: chat.id) }
  describe 'retrieves all chat admins' do
    before do
      get api_chat_chat_admins_path(chat_id: chat.id)
    end

    it 'returns chat admins' do
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
