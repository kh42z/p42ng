# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chats', type: :request do
  include_context 'with cache'
  let(:auth) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }
  describe '#index' do
    it 'should get chats' do
      create_list(:chat, 2)
      get api_chats_url, headers: access_token
      assert_response :success
      expect(json.size).to eq(2)
    end
    it 'should get chats where participant_id equal' do
      create_list(:chat, 2)
      ChatParticipant.create(chat: Chat.first, user: User.first)
      get api_chats_url, headers: access_token, params: { participant_id: User.first.id }
      expect(response).to have_http_status(200)
      expect(json.size).to eq(1)
    end
    it 'should get chat' do
      chat = create(:chat)
      get api_chat_url(chat.id), headers: access_token
      expect(response).to have_http_status(200)
      assert_equal chat.privacy, json['privacy']
    end
    it 'should get timeout_id of muted participant' do
      user_1 = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post invites_api_chat_url(Chat.first.id), headers: access_token, params: { participant_ids: [user_1.id] }
      post mutes_api_chat_url(Chat.first.id), headers: access_token, params: { user_id: user_1.id, duration: 10 }
      get api_chat_url(Chat.first.id), headers: access_token
      expect(json['timeout_ids'][0]).to eq user_1.id
    end
    it 'should get ban_id of banned participant' do
      user_1 = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post invites_api_chat_url(Chat.first.id), headers: access_token, params: { participant_ids: [user_1.id] }
      post bans_api_chat_url(Chat.first.id), headers: access_token, params: { user_id: user_1.id, duration: 10 }
      get api_chat_url(Chat.first.id), headers: access_token
      expect(json['ban_ids'][0]).to eq user_1.id
    end
  end

  describe '#create' do
    context 'should create a chat with :' do
      it 'owner as admin' do
        post api_chats_url, headers: access_token, params: { name: 'Hop' }
        expect(response).to have_http_status(201)
        expect(ChatParticipant.first.role).to eq('owner')
      end
      it 'two participants' do
        user = create(:user)
        post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'private', participant_ids: [user.id] }
        expect(response).to have_http_status(201)
        expect(ChatParticipant.first.user_id).to eq(auth.id)
        expect(ChatParticipant.last.user_id).to eq(user.id)
      end
      it 'a name' do
        post api_chats_url, headers: access_token, params: { name: 'DISCUSSION' }
        expect(response).to have_http_status(201)
        expect(Chat.first.name).to eq('DISCUSSION')
      end
      it 'bad participant ID param' do
        post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [0] }
        expect(response).to have_http_status(201)
      end
      it "current_user as chat's owner" do
        post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'protected', password: 'asd' }
        expect(response).to have_http_status(201)
        expect(Chat.first.owner.id).to eq(auth.id)
        expect(ChatParticipant.first.user_id).to eq(auth.id)
        expect(ChatParticipant.first.role).to eq('owner')
        expect(Chat.first.name).to eq('Hop')
        expect(json).to include('name' => 'Hop')
      end
      it 'two participants max if direct_message',test:true do
        users = create_list(:user, 3)
        post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'direct_message', participant_ids: [users[0].id, users[1].id, users[2].id] }
        expect(Chat.first.participants.count).to eq 2
      end
    end
    context 'should not create :' do
      it 'a protected chat without password' do
        post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'protected' }
        expect(response).to have_http_status(422)
        expect(response.body).to match("Validation failed: Password can't be blank")
      end
      it 'a chat without a name' do
        post api_chats_url, headers: access_token
        expect(response).to have_http_status(422)
        expect(response.body).to match("Validation failed: Name can't be blank")
      end
    end
  end

  describe '#join' do
    let(:chat_attributes) { { name: 'Hop', privacy: 'protected', password: 'abc' } }
    let(:user) { create(:user) }
    let(:user_access) { user.create_new_auth_token }
    before { post api_chats_url, headers: access_token, params: chat_attributes }
    it 'should let a user join a protected chat' do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(response.status).to eq 201
      expect(ChatParticipant.count).to eq(2)
    end
    it 'should return error: passwordRequired' do
      post participants_api_chat_url(Chat.first.id), headers: user_access
      expect(response).to have_http_status(422)
      expect(json['error']).to eq 'param is missing or the value is empty: password'
      expect(ChatParticipant.count).to eq(1)
    end
    it 'should return error : passwordIncorrect' do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'cbd' }
      expect(response.status).to eq 422
      expect(response.body).to match(I18n.t('passwordIncorrect'))
      expect(ChatParticipant.count).to eq(1)
    end
    it 'should not let user join twice' do
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(response.status).to eq 201
      post participants_api_chat_url(Chat.first.id), headers: user_access, params: { password: 'abc' }
      expect(json['message']).to eq 'Validation failed: User has already been taken'
      expect(response.status).to eq 422
    end
  end
  describe '#mutes' do
    let(:user) { create(:user) }
    let(:chat) { create(:chat, owner: auth) }
    it 'should mute a participant' do
      timer = 2
      post participants_api_chat_url(chat.id), headers: access_token, params: { user: user, chat: chat }
      post mutes_api_chat_url(chat.id), headers: access_token, params: { user_id: user.id, duration: timer }
      expect(response).to have_http_status(201)
      expect(Rails.cache.exist?("timeout_chat_#{chat.id}_#{user.id}")).to eq(true)
      sleep((timer + 1).seconds)
      expect(Rails.cache.exist?("timeout_chat_#{chat.id}_#{user.id}")).to eq(false)
    end
    it 'should return an error, due to bad parameters' do
      post mutes_api_chat_url(chat.id), headers: access_token, params: { useP: user, duration: 2 }
      expect(response).to have_http_status(422)
    end
    it 'should not let participant mute' do
      access = user.create_new_auth_token
      post participants_api_chat_url(chat.id), headers: access, params: { user: user, chat: chat }
      post mutes_api_chat_url(chat.id), headers: access, params: { user_id: user.id, duration: 2 }
      expect(response).to have_http_status(403)
      expect(json['errors']).to eq ['This action is not allowed with your current privileges.']
    end
  end
  describe '#bans' do
    let(:user) { create(:user) }
    let(:chat) { create(:chat, owner: auth) }
    it 'should ban a participant' do
      timer = 2
      post participants_api_chat_url(chat.id), headers: access_token, params: { user: user, chat: chat }
      post bans_api_chat_url(chat.id), headers: access_token, params: { user_id: user.id, duration: timer }
      expect(response).to have_http_status(201)
      expect(Rails.cache.exist?("ban_chat_#{chat.id}_#{user.id}")).to eq(true)
    end
    it 'should return an error, due to bad parameters' do
      post bans_api_chat_url(chat.id), headers: access_token, params: { userP: user, duration: 2 }
      expect(response).to have_http_status(422)
    end
    it 'should not let participant ban' do
      access = user.create_new_auth_token
      post participants_api_chat_url(chat.id), headers: access, params: { user: user, chat: chat }
      post bans_api_chat_url(chat.id), headers: access, params: { user_id: user.id, duration: 2 }
      expect(response).to have_http_status(403)
      expect(json['errors']).to eq ['This action is not allowed with your current privileges.']
    end
  end

  describe '#update' do
    let(:user) { create(:user) }
    let(:access) { user.create_new_auth_token }
    it "should change chat's name and privacy" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(Chat.first.id), headers: access_token, params: { name: 'Custom Name', privacy: 'private' }
      expect(Chat.first.name).to eq('Custom Name')
      expect(Chat.first.privacy).to eq('private')
    end
    it "should return 'not_allowed'" do
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      put api_chat_url(Chat.first.id), headers: access, params: { admin_ids: [user.id] }
      expect(response).to have_http_status(403)
      expect(response.body).to match(I18n.t('notAllowed'))
    end
  end

  describe '#leave' do
    let(:user) { create(:user) }
    let(:chat) { create(:chat) }
    let(:access) { user.create_new_auth_token }
    it 'should let participant leave chat' do
      post participants_api_chat_url(chat.id), headers: access, params: { user: user, chat: chat }
      delete participants_api_chat_url(chat.id), headers: access
      expect(ChatParticipant.count).to eq(1)
    end
    it 'should let participant leave protected chat' do
      post api_chats_url, headers: access_token, params: { name: 'Hop', privacy: 'protected', password: 'abc' }
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(0)
      expect(response.status).to eq 204
      expect(Chat.first).to eq nil
    end
    it 'should delete participant and chat' do
      post api_chats_url, headers: access, params: { name: 'Hop' }
      delete participants_api_chat_url(Chat.first.id), headers: access
      expect(ChatParticipant.count).to eq(0)
      expect(Chat.first).to eq nil
    end
    it 'should delete participant and set another admin and owner' do
      post api_chats_url, headers: access_token, params: { name: 'Hop', participant_ids: [user.id] }
      delete participants_api_chat_url(Chat.first.id), headers: access_token
      expect(ChatParticipant.count).to eq(1)
      expect(ChatParticipant.where(role: 'owner').count).to eq(1)
      expect(ChatParticipant.first.user_id).to eq(user.id)
      expect(ChatParticipant.where(role: 'owner').first.user_id).to eq(user.id)
      expect(Chat.first.owner.id).to eq(user.id)
      expect(response).to have_http_status(204)
    end
  end

  describe '#kick' do
    let(:user) { create(:user) }
    let(:user_2) { create(:user) }
    let(:access) { user.create_new_auth_token }
    before do
      post api_chats_url, headers: access_token,
           params: { name: 'Hop', privacy: 'private', participant_ids: [user.id, user_2.id] }
    end
    it 'should kick a participant' do
      delete "/api/chats/#{Chat.first.id}/participants/#{user.id}", headers: access_token
      expect(response.status).to eq 204
      expect(ChatParticipant.where(user: user, chat: Chat.first).first).to eq nil
    end
    it 'should not let participant kick a participant' do
      delete "/api/chats/#{Chat.first.id}/participants/#{user.id}", headers: access
      expect(response.status).to eq 403
      expect(ChatParticipant.count).to eq 3
    end
    it 'should let admin kick a participant' do
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      delete "/api/chats/#{Chat.first.id}/participants/#{user_2.id}", headers: access
      expect(response.status).to eq 204
      expect(ChatParticipant.where(user: user_2, chat: Chat.first).first).to eq nil
    end
    it 'should not let admin kick the owner' do
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      delete "/api/chats/#{Chat.first.id}/participants/#{auth.id}", headers: access
      expect(response.status).to eq 403
      expect(ChatParticipant.where(user: auth, chat: Chat.first)).to exist
    end
    it 'should let admin kick admin' do
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      post "/api/chats/#{Chat.first.id}/admins/#{user_2.id}", headers: access_token
      delete "/api/chats/#{Chat.first.id}/participants/#{user_2.id}", headers: access
      expect(response.status).to eq 204
      expect(ChatParticipant.where(user: user_2, chat: Chat.first)).to_not exist
    end
  end

  describe '#destroy' do
    it 'returns status code 204' do
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
      expect(response).to have_http_status(403)
      expect(Chat.count).to eq(1)
    end
  end

  describe '#invites' do
    it 'should invite participants' do
      user_1, user_2 = create_list(:user, 2)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post invites_api_chat_url(Chat.first), headers: access_token, params: { participant_ids: [user_1.id, user_2.id] }
      expect(response.status).to eq 201
      expect(Chat.first.participants.count).to eq 3
    end
  end
  describe '#admins' do
    it 'should promote a participant' do
      user = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      create(:chat_participant, chat_id: Chat.first.id, user: user)
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      expect(response.status).to eq 201
      expect(ChatParticipant.where(chat: Chat.first, role: 'admin').count).to eq 1
      expect(ChatParticipant.where(user: user, chat: Chat.first, role: 'admin')).to exist
    end
    it 'should demote an admin' do
      user = create(:user)
      post api_chats_url, headers: access_token, params: { name: 'Hop' }
      post participants_api_chat_url(Chat.first.id), headers: access_token
      post "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      delete "/api/chats/#{Chat.first.id}/admins/#{user.id}", headers: access_token
      expect(response.status).to eq 204
      expect(ChatParticipant.where(chat: Chat.first, role: 'admin').count).to eq 0
      expect(ChatParticipant.where(user: user, chat: Chat.first, role: 'admin')).to_not exist
    end
  end
end
