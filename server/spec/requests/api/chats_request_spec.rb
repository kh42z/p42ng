# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Chats", type: :request do
  let(:auth) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }

  describe "#get" do
    it "should get chats" do
      create_list(:chat, 2)
      get api_chats_url, headers: access_token
      assert_response :success
      expect(json.size).to eq(2)
    end
    it "should get chats where participant_id equal" do
      create_list(:chat, 2)
      ChatParticipant.create(chat: Chat.first, user: User.first)
      get api_chats_url, headers: access_token, params: {"participant_id": User.first.id}
      expect(response).to have_http_status(200)
      expect(json.size).to eq(1)
    end
    it "should get chat" do
      chat = create(:chat)
      get api_chat_url(chat.id), headers: access_token
      expect(response).to have_http_status(200)
      assert_equal chat.privacy, json["privacy"]
    end
    it "should return an error" do
      get api_chat_url(100000), headers: access_token
      expect(response).to have_http_status(404)
    end
    it "should get chat with participants" do
      chat = chat_with_participants(count: 2)
      get api_chat_url(chat.id), headers: access_token
      expect(response).to have_http_status(200)
      expect(Chat.first.chat_participants.count).to eq(2)
    end
    it "should get a chat with admins, participants, timeouts and bans" do
      chat = chat_full
      get api_chat_url(chat.id), headers: access_token
      expect(response).to have_http_status(200)
      expect(Chat.first.chat_bans.first).to be_instance_of(ChatBan)
      expect(Chat.first.chat_participants.first).to be_instance_of(ChatParticipant)
      expect(Chat.first.chat_timeouts.first).to be_instance_of(ChatTimeout)
      expect(Chat.first.chat_admins.first).to be_instance_of(ChatAdmin)
    end
  end

  describe "#post" do
    before { post api_chats_url, headers: access_token, params: {privacy: "protected", password: "asd"} }
    it "should return 201 created" do
      expect(response).to have_http_status(201)
    end
    it "current_user should be chat's owner" do
      expect(Chat.first.owner_id).to eq(auth.id)
    end
  end

  describe "#destroy" do
    it "returns status code 204" do
      chat = create(:chat)
      delete "/api/chats/#{chat.id}", headers: access_token
      expect(response).to have_http_status(204)
    end
  end
end

def chat_full
  create(:chat) do |chat|
    create(:chat_admin, chat: chat)
    create(:chat_participant, chat: chat)
    create(:chat_ban, chat: chat)
    create(:chat_timeout, chat: chat)
  end
end

def chat_with_admins(count: 1)
  create(:chat) do |chat|
    create_list(:chat_admin, count, chat: chat)
  end
end

def chat_with_participants(count: 1)
  create(:chat) do |chat|
    create_list(:chat_participant, count, chat: chat)
  end
end
