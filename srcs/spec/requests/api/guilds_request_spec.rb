# frozen_string_literal: true

require 'rails_helper'

describe 'Guild', type: :request do
  let(:auth) { create(:user) }
  let(:auth_2) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }
  let(:access_token_2) { auth_2.create_new_auth_token }
  let(:attributes) { { name: 'NoShroud', anagram: 'NOSDO' } }
  let(:attributes_2) { { name: 'Bang', anagram: 'BBANG' } }
  let(:user_1) { create(:user) }
  let(:user_2) { create(:user) }
  describe '#get' do
    it 'should return guilds' do
      create_list(:guild, 2)
      get api_guilds_url, headers: access_token
      expect(json.size).to eq 2
      expect(response.status).to eq 200
    end
    it 'should return guild' do
      guild, guild_2 = create_list(:guild, 2)
      get api_guild_url(guild), headers: access_token
      expect(json['id']).to eq guild.id
      expect(response.status).to eq 200
    end
    it 'should return user with guild_id' do
      post api_guilds_url, headers: access_token, params: attributes
      get api_user_url(auth), headers: access_token
      expect(json['guild_id']).to eq Guild.first.id
    end
    it 'should return guild with owner_id' do
      post api_guilds_url, headers: access_token, params: attributes
      get api_guild_url(Guild.first.id), headers: access_token
      expect(json['owner_id'][0]).to eq auth.id
      expect(json['member_ids'][0]).to eq auth.id
    end
    it 'should return guild wars' do
      
    end
  end

  describe '#create' do
    it 'returns status code 201' do
      post api_guilds_url, headers: access_token, params: attributes
      expect(response).to have_http_status(201)
      expect(Guild.first.owner).to eq(auth.guild_member)
    end
    it 'returns status code 422' do
      post api_guilds_url, headers: access_token
      expect(response).to have_http_status(422)
      expect(response.body).to match("can't be blank")
    end
    it 'returns an error message' do
      post api_guilds_url, headers: access_token, params: attributes
      post api_guilds_url, headers: access_token, params: attributes_2
      expect(response.body).to match(I18n.t('hasGuildAlready'))
      expect(response).to have_http_status(403)
    end
    it 'should create two different guilds' do
      post api_guilds_url, headers: access_token, params: attributes
      post api_guilds_url, headers: access_token_2, params: attributes_2
      expect(response.status).to eq 201
    end
  end

  describe '#update' do
    before { post api_guilds_url, headers: access_token, params: attributes }
    it 'should be updated' do
      put api_guild_url(Guild.first.id), headers: access_token, params: { name: 'Updated', anagram: 'upd4t' }
      expect(Guild.first.name).to eq('Updated')
      expect(Guild.count).to eq(1)
      expect(response.status).to eq 200
    end
    it 'should return error: Forbidden' do
      put api_guild_url(Guild.first.id), headers: access_token_2, params: { name: 'Updated', anagram: 'upd4t' }
      expect(response.message).to eq 'Forbidden'
      expect(response.status).to eq 403
    end
  end

  describe '#create_members' do
    before { post api_guilds_url, headers: access_token, params: attributes }
    it 'owner should add members' do
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 2
      expect(response.status).to eq 201
    end
    it 'should let officers add members' do
      user_1_access = user_1.create_new_auth_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_2.id}", headers: user_1_access
      expect(Guild.first.officers.count).to eq 1
      expect(response.status).to eq 201
    end
    it 'should not let members add members' do
      user_1_access = user_1.create_new_auth_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_2.id}", headers: user_1_access
      expect(response.status).to eq 403
    end
    it 'should not add a member who is already member of a guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.last.id}/members/#{user_1.id}", headers: access_token_2
      expect(json['message']).to eq 'Validation failed: User has already been taken'
      expect(GuildMember.where(user_id: user_1.id, guild_id: Guild.last.id)[0]).to eq nil
    end
  end
  describe '#destroy_members' do
    before { post api_guilds_url, headers: access_token, params: attributes }
    it 'should destroy a member' do
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 2
      delete "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 1
      expect(response.status).to eq 204
    end
    it 'should not destroy a member of another guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      delete "/api/guilds/#{Guild.last.id}/members/#{user_1.id}", headers: access_token_2
      expect(GuildMember.where(user_id: user_1.id, guild_id: Guild.first.id)).to exist
    end
    it 'should not let officer destroy owner' do
      post "/api/guilds/#{Guild.first.id}/members/#{auth_2.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/officers/#{auth_2.id}", headers: access_token
      delete "/api/guilds/#{Guild.last.id}/members/#{auth.id}", headers: access_token_2
      expect(response.status).to eq 403
      expect(Guild.first.owner).to eq auth.guild_member
    end
    context 'if owner leaves' do
      it 'should destroy guild if he is the last to leave' do
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first).to eq nil
      end
      it 'should give ownership to first officer and demote him' do
        post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
        post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first.owner).to eq user_1.guild_member
      end
      it 'should give ownership to first member' do
        post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first.owner).to eq user_1.guild_member
      end
    end
  end

  describe '#officers' do
    before do
      post api_guilds_url, headers: access_token, params: attributes
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
    end
    it 'should let owner add officers' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
      expect(response.status).to eq 201
    end
    it 'should not add an officer who is already officer in another guild' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.last.id}/officers/#{user_1.id}", headers: access_token_2
      expect(Guild.last.officers.count).to eq 0
    end
    it 'should not promote a member as officer twice' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
    end
    it 'should let owner demote an officer' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      delete "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 0
      expect(response.status).to eq 204
    end
    it 'should not destroy an officer of another guild' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post api_guilds_url, headers: access_token_2, params: attributes_2
      delete "/api/guilds/#{Guild.last.id}/officers/#{user_1.id}", headers: access_token_2
      expect(Guild.first.officers.count).to eq 1
    end
  end

  describe '#Invitations' do
    include(CacheHelper)
    include_context 'with cache'
    let(:user) { create(:user, status: 'online') }
    let(:user_access) { user.create_new_auth_token }
    let(:current_guild) { create(:guild) }
    before do
      GuildMember.create(guild: current_guild, rank: 'owner', user: auth)
      post api_guilds_url, headers: access_token, params: attributes
      post invitations_api_guild_url(current_guild.id), headers: access_token, params: { user_id: user.id }
    end
    it 'should send an invitation' do
      expect(response.status).to eq 201
      expect(json['user_id']).to eq user.id
      expect(guild_pending_invitation?(current_guild.id, user.id)).to be_truthy
    end
    it 'should let invited user join guild' do
      post members_api_guild_url(current_guild.id), headers: user_access
      expect(response.status).to eq 201
      expect(guild_pending_invitation?(current_guild.id, user.id)).to be_falsey
    end
    it 'should let invited user refuse' do
      delete invitations_api_guild_url(current_guild.id), headers: user_access
      expect(response.status).to eq 204
      expect(guild_pending_invitation?(current_guild.id, user.id)).to be_falsey
    end
  end

  describe '#NoInvitations' do
    include(CacheHelper)
    include_context 'with cache'
    let(:user) { create(:user, status: 'online') }
    let(:current_guild) { create(:guild) }

    it 'should not invite an offline user' do
      GuildMember.create(guild: current_guild, rank: 'officer', user: auth)
      user.update(status: 'offline')
      user.reload
      post invitations_api_guild_url(current_guild.id), headers: access_token, params: { user_id: user.id }
      expect(response.status).to eq 403
      expect(json.size).to eq(1)
    end

    it 'should not invite an user if you arent officer or owner' do
      post invitations_api_guild_url(current_guild.id), headers: access_token, params: { user_id: user.id }
      expect(response.status).to eq 403
      expect(json.size).to eq(1)
    end
  end
end
