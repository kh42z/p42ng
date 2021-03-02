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
    it "should return 201 & current_user should be chat's owner/participant/admin" do
      post api_chats_url, headers: access_token, params: {name: "Hop", privacy: "protected", password: "asd"}
      expect(response).to have_http_status(201)
      expect(Chat.first.owner_id).to eq(auth.id)
      expect(ChatParticipant.first.user_id).to eq(auth.id)
      expect(ChatAdmin.first.user_id).to eq(auth.id)
      expect(Chat.first.name).to eq("Hop")
    end
    it "should not create a protected chat without password" do
      post api_chats_url, headers: access_token, params: {name: "Hop", privacy: "protected"}
      expect(response).to have_http_status(422)
      expect(response.body).to match("Validation failed: Password can't be blank")
    end
    it "should create a chat with owner as admin" do
      post api_chats_url, headers: access_token, params: {name: "Hop"}
      expect(response).to have_http_status(201)
      expect(ChatAdmin.first.user_id).to eq(auth.id)
    end
    it "should create a chat with two participants" do
      user = create(:user)
      post api_chats_url, headers: access_token, params: {name: "Hop", privacy: "private", participant_ids: [user.id]}
      expect(response).to have_http_status(201)
      expect(ChatParticipant.first.user_id).to eq(auth.id)
      expect(ChatParticipant.last.user_id).to eq(user.id)
    end
    it "should create a chat with a name" do
      post api_chats_url, headers: access_token, params: {name: 'DISCUSSION'}
      expect(response).to have_http_status(201)
      expect(Chat.first.name).to eq('DISCUSSION')
    end
    it "should not create a chat without a name" do
      post api_chats_url, headers: access_token
      expect(response).to have_http_status(422)
      expect(response.body).to match("Validation failed: Name can't be blank")
    end
    it "should create a chat without bad participant ID" do
      post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [0]}
      expect(response).to have_http_status(422)
      expect(response.body).to match("Validation failed: User can't be blank, User must exist")
    end
  end

  describe "#create_participant" do
    let(:chat) { create(:chat) }
    let(:chat_protected) { create(:chat, privacy: 'protected', password: 'password') }
    it "should create a new participant" do
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: auth, chat: chat}
      expect(response).to have_http_status(200)
      expect(ChatParticipant.first.chat_id).to eq(chat.id)
    end
    it "should return error : passwordRequired" do
      post participants_api_chat_url(chat_protected.id), headers: access_token, params: {user: auth, chat: chat}
      expect(response).to have_http_status(422)
      # expect this ActionController::ParameterMissing
      expect(ChatParticipant.count).to eq(0)
    end
    it "should return 201 with correct chat password" do
      post participants_api_chat_url(chat_protected.id), headers: access_token, params: {user: auth, chat: chat, password: 'password'}
      expect(response).to have_http_status(200)
      expect(ChatParticipant.count).to eq(1)
    end
    it "should return error : passwordIncorrect" do
      post participants_api_chat_url(chat_protected.id), headers: access_token, params: {user: auth, chat: chat, password: 'word'}
      expect(response).to have_http_status(422)
      expect(response.body).to match(I18n.t('passwordIncorrect'))
      expect(ChatParticipant.count).to eq(0)
    end
    it "add same participants twice, should return status 422" do
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: auth, chat: chat}
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: auth, chat: chat}
      expect(response).to have_http_status(422)
    end
  end
  describe "#mutes" do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    it "should mute a participant" do
      timer = 2
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: user, chat: chat}
      post mutes_api_chat_url(chat.id), headers: access_token, params: {user_id: user.id, duration: timer}
      expect(response).to have_http_status(200)
      expect(ChatTimeout.count).to eq(1)
      expect { DestroyObjectJob.set(wait: timer, queue: "default").perform_later('ChatTimeout') }.to have_enqueued_job
    end
    it "should return an error, due to bad parameters" do
      post mutes_api_chat_url(chat.id), headers: access_token, params: {useP: user, duration: 2}
      expect(response).to have_http_status(422)
    end
  end
  describe "#bans" do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    it "should ban a participant" do
      timer = 2
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: user, chat: chat}
      post bans_api_chat_url(chat.id), headers: access_token, params: {user_id: user.id, duration: timer}
      expect(response).to have_http_status(200)
      expect(ChatBan.count).to eq(1)
      expect { DestroyObjectJob.set(wait: timer, queue: "default").perform_later('ChatBan') }.to have_enqueued_job
    end
    it "should return an error, due to bad parameters" do
      post bans_api_chat_url(chat.id), headers: access_token, params: {userP: user, duration: 2}
      expect(response).to have_http_status(422)
    end
  end

  describe "#update" do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    it "should change chat's name and privacy", test: true do
      put api_chat_url(chat.id), headers: access_token, params: { name: 'Custom Name', privacy: 'private'}
      expect(Chat.first.name).to eq("Custom Name")
      expect(Chat.first.privacy).to eq("private")
    end
    it "should add two chat admins" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(chat.id), headers: access_token, params: { admin_ids: [user.id] }
      expect(ChatAdmin.count).to eq(2)
    end
  end

  describe "#destroy_participant" do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    let(:access) { user.create_new_auth_token }
    it "should destroy a participant" do
      post participants_api_chat_url(chat.id), headers: access, params: {user: user, chat: chat}
      delete participants_api_chat_url(chat.id), headers: access
      expect(ChatParticipant.count).to eq(0)
    end
    it "should destroy an admin" do
      post api_chats_url, headers: access, params: { name: 'Hop' }
      delete participants_api_chat_url(Chat.first.id), headers: access
      expect(ChatParticipant.count).to eq(0)
      expect(ChatAdmin.count).to eq(0)
    end
    it "should destroy ChatAdmin and ChatParticipant" do
      post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [user.id] }
      expect(ChatParticipant.count).to eq(2)
      expect(ChatParticipant.last.user_id).to eq(user.id)
      put api_chat_url(Chat.first.id), headers: access_token, params: { admin_ids: [user.id] }
      expect(ChatAdmin.count).to eq(2)
      delete participants_api_chat_url(Chat.first.id), headers: access
      expect(ChatParticipant.count).to eq(1)
      expect(ChatAdmin.count).to eq(1)
      expect(response).to have_http_status(204)
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
