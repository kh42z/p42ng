require 'rails_helper'

RSpec.describe "Api::Messages", type: :request do
  include_context "with cache"
  let(:auth) { create(:user) }
  let(:current_chat) { create(:chat)}
  let(:access_token) { auth.create_new_auth_token }

  describe "#post" do
    it "should create message" do
      ChatParticipant.create(chat: current_chat, user: auth)
      post "/api/chats/#{current_chat.id}/messages", headers: access_token, params: { chat_message: { content: "Hey"}}
      expect(json.size).to eq 4
      expect(response.status).to eq 200
      expect(ChatMessage.all.count).to eq(1)
    end

    it "should not create chat_message: not a participant" do
      post "/api/chats/#{current_chat.id}/messages", headers: access_token, params: { chat_message: { content: "Hey"}}
      expect(response.status).to eq 401
      expect(ChatMessage.all.count).to eq(0)
    end


    it "should not create chat_message: message too long" do
      ChatParticipant.create(chat: current_chat, user: auth)
      post "/api/chats/#{current_chat.id}/messages", headers: access_token, params: { chat_message: { content: "0" * 500 }}
      expect(response.status).to eq 422
      expect(ChatMessage.all.count).to eq(0)
    end


    it "should not create chat_message: user timeout" do
      ChatParticipant.create(chat: current_chat, user: auth)
      Rails.cache.write("timeout_chat_#{current_chat.id}_#{auth.id}", 1)
      post "/api/chats/#{current_chat.id}/messages", headers: access_token, params: { chat_message: { content: "0" * 500 }}
      expect(response.status).to eq 401
      expect(ChatMessage.all.count).to eq(0)
    end
  end

  describe "#get" do
    it "should retrieves last 10 messages" do
      chat = create(:chat_with_messages, messages_count: 20)
      create(:chat_participant, user: auth, chat: chat)
      get "/api/chats/#{chat.id}/messages", headers: access_token
      expect(ChatMessage.all.count).to eq(20)
      expect(json.size).to eq 10
      expect(response.status).to eq 200
    end
  end
end
