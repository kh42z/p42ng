# frozen_string_literal: true

require "rails_helper"



RSpec.describe "Chats", type: :request do
  include_context "with cache"
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
      expect(Chat.first.chat_participants.first).to be_instance_of(ChatParticipant)
      expect(Chat.first.chat_admins.first).to be_instance_of(ChatAdmin)
      #expect(Chat.first.chat_bans.first).to be_instance_of(ChatBan)
      #expect(Chat.first.chat_timeouts.first).to be_instance_of(ChatTimeout)
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
      expect(json).to include("name" => "Hop")
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
    it "should create a chat with bad participant ID" do
      post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [0]}
      expect(response).to have_http_status(201)
    end
  end
  describe "#create_participant" do
    let(:chat_attributes) { { name: 'Hop', privacy: 'protected', password: 'abc' }}
    let(:user) { create(:user) }
    let(:user_access) { user.create_new_auth_token }
    before { post api_chats_url, headers: access_token, params: chat_attributes }
    it "should let a user join a protected chat" do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(response.status).to eq 200
      expect(ChatParticipant.count).to eq(2)
    end
    it "should return error: passwordRequired" do
      post participants_api_chat_url(Chat.first.id), headers: user_access
      expect(response).to have_http_status(422)
      expect(json["error"]).to eq 'param is missing or the value is empty: password'
      expect(ChatParticipant.count).to eq(1)
    end
    it "should return error : passwordIncorrect" do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'cbd' }
      expect(response.status).to eq 422
      expect(response.body).to match(I18n.t('passwordIncorrect'))
      expect(ChatParticipant.count).to eq(1)
    end
    it "should not let user join twice" do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(response.status).to eq 200
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(json["message"]).to eq 'Validation failed: User has already been taken'
      expect(response.status).to eq 422
    end
  end
  describe "#mutes" do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    it "should mute a participant" do
      timer = 2
      post participants_api_chat_url(chat.id), headers: access_token, params: {user: user, chat: chat}
      post mutes_api_chat_url(chat.id), headers: access_token, params: {user_id: user.id, duration: timer}
      expect(response).to have_http_status(204)
      expect(Rails.cache.exist?("timeout_chat_#{chat.id}_#{user.id}")).to eq(true)
      sleep((timer + 1).seconds)
      expect(Rails.cache.exist?("timeout_chat_#{chat.id}_#{user.id}")).to eq(false)
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
      expect(response).to have_http_status(204)
      expect(Rails.cache.exist?("ban_chat_#{chat.id}_#{user.id}")).to eq(true)
    end
    it "should return an error, due to bad parameters" do
      post bans_api_chat_url(chat.id), headers: access_token, params: {userP: user, duration: 2}
      expect(response).to have_http_status(422)
    end
  end

  describe "#update" do
    let(:user) { create(:user) }
    let(:access) { user.create_new_auth_token }
    it "should change chat's name and privacy" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(Chat.first.id), headers: access_token, params: { name: 'Custom Name', privacy: 'private'}
      expect(Chat.first.name).to eq("Custom Name")
      expect(Chat.first.privacy).to eq("private")
    end
    it "should return 'not_allowed'" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(Chat.first.id), headers: access, params: { admin_ids: [user.id] }
      expect(response).to have_http_status(401)
      expect(response.body).to match(I18n.t('notAllowed'))
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
    it "should destroy a participant from protected chat" do
      post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'protected', password: 'abc' }
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(0)
      expect(response.status).to eq 204
      expect(Chat.first).to eq nil
    end
    it "should destroy a participant from updated chat" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(Chat.first.id), headers: access_token, params: { privacy: 'protected', password: 'abc'}
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(0)
      expect(response.status).to eq 204
      expect(Chat.first).to eq nil
    end
    it "should destroy admin/participant and chat" do
      post api_chats_url, headers: access, params: { name: 'Hop' }
      delete participants_api_chat_url(Chat.first.id), headers: access
      expect(ChatParticipant.count).to eq(0)
      expect(ChatAdmin.count).to eq(0)
      expect(Chat.first).to eq nil
    end
    it "should destroy last ChatAdmin and set another participant admin/owner", test:true do
      post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [user.id] }
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(1)
      expect(ChatAdmin.count).to eq(1)
      expect(ChatParticipant.first.user_id).to eq(user.id)
      expect(ChatAdmin.first.user_id).to eq(user.id)
      expect(Chat.first.owner_id).to eq(user.id)
      expect(response).to have_http_status(204)
    end
    it "should destroy last ChatAdmin and destroy chat" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(0)
      expect(ChatAdmin.count).to eq(0)
      expect(Chat.count).to eq(0)
      expect(response).to have_http_status(204)
    end
  end

  describe "#destroy" do
    it "returns status code 204" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      delete api_chat_url(Chat.first.id), headers: access_token
      expect(response).to have_http_status(204)
      expect(Chat.count).to eq(0)
    end
    it 'should destroy protected chat without error' do
      post api_chats_url, headers: access_token, params: { name: 'ok', privacy: 'protected', password: 'abc' }
      delete api_chat_url(Chat.first.id), headers: access_token
      expect(response).to have_http_status(204)
      expect(Chat.count).to eq(0)
    end
    it 'should not let participant destroy chat' do
      user = create(:user)
      user_access = user.create_new_auth_token
      post api_chats_url, headers: access_token, params: { name: 'ok', privacy: 'protected', password: 'abc' }
      post participants_api_chat_url(Chat.first.id), headers: user_access
      delete api_chat_url(Chat.first.id), headers: user_access
      expect(response).to have_http_status(401)
      expect(Chat.count).to eq(1)
    end
  end

  describe '#invites' do
    it 'should invite participants' do
      user_1, user_2 = create_list(:user, 2)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post invites_api_chat_url(Chat.first), headers: access_token, params: { participant_ids: [user_1.id, user_2.id] }
      expect(response.status).to eq 200
      expect(Chat.first.chat_participants.count).to eq 3
    end
  end
  describe '#admins', test:true do
    it 'should promote a user as admin' do
      user = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post participants_api_chat_url(Chat.first.id), headers: access_token
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      expect(response.status).to eq 200
      expect(ChatAdmin.count).to eq 2
      expect(ChatAdmin.where(user: user, chat: Chat.first)).to exist
    end
    it 'should demote an admin' do
      user = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post participants_api_chat_url(Chat.first.id), headers: access_token
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      delete "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      expect(response.status).to eq 204
      expect(ChatAdmin.count).to eq 1
      expect(ChatAdmin.where(user: user, chat: Chat.first)).to_not exist
    end
  end
end

def chat_full
  create(:chat) do |chat|
    create(:chat_admin, chat: chat)
    create(:chat_participant, chat: chat)
    #TODO: write in cache for to/bans?
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
