# frozen_string_literal: true

require "rails_helper"

describe "Guild", type: :request do
  let(:auth) { create(:user) }
  let(:auth_2) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }
  let(:access_token_2) { auth_2.create_new_auth_token }
  let(:attributes) { { name: "NoShroud", anagram: "NOSDO" } }
  let(:attributes_2) { { name: "Bang", anagram: "BBANG" } }
  let(:user_1) { create(:user) }
  let(:user_2) { create(:user) }
  describe "#get" do
    it "should return guilds" do
      create_list(:guild, 2)
      get api_guilds_url, headers: access_token
      expect(json.size).to eq 2
      expect(response.status).to eq 200
    end
    it "should return guild" do
      guild, guild_2 = create_list(:guild, 2)
      get api_guild_url(guild), headers: access_token
      expect(json["id"]).to eq guild.id
      expect(response.status).to eq 200
    end
  end

  describe "#create" do
    it "returns status code 201" do
      post api_guilds_url, headers: access_token, params: attributes
      expect(response).to have_http_status(201)
      expect(Guild.first.owner_id).to eq(auth.id)
    end
    it "returns status code 422" do
      post api_guilds_url, headers: access_token
      expect(response).to have_http_status(422)
      expect(response.body).to match("can't be blank")
    end
    it "returns an error message" do
      post api_guilds_url, headers: access_token, params: attributes
      post api_guilds_url, headers: access_token, params: attributes_2
      expect(response.body).to match(I18n.t('hasGuildAlready'))
      expect(response).to have_http_status(403)
    end
  end

  describe "#update" do
    before { post api_guilds_url, headers: access_token, params: attributes }
    it "should be updated" do
      put api_guild_url(Guild.first.id), headers: access_token, params: { name: "Updated", anagram: "upd4t" }
      expect(Guild.first.name).to eq("Updated")
      expect(Guild.count).to eq(1)
      expect(response.status).to eq 200
    end
    it 'should return error: Unauthorized' do
      put api_guild_url(Guild.first.id), headers: access_token_2, params: { name: "Updated", anagram: "upd4t" }
      expect(response.message).to eq 'Unauthorized'
      expect(response.status).to eq 401
    end
  end

  describe "#members" do
    before { post api_guilds_url, headers: access_token, params: attributes }
    it 'owner should add members' do
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id, user_2.id] }
      expect(Guild.first.members.count).to eq 3
      expect(User.find(user_1.id).guild).to eq Guild.first
      expect(response.status).to eq 200
    end
    it 'should let officers add members' do
      user_1_access = user_1.create_new_auth_token
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
      post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id] }
      post members_api_guild_url(Guild.first), headers: user_1_access, params: { member_ids: [user_2.id] }
      expect(Guild.first.officers.count).to eq 1
      expect(User.find(user_1.id).guild).to eq Guild.first
      expect(response.status).to eq 200
    end
    it 'should not let members add members', test:true do
      user_1_access = user_1.create_new_auth_token
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
      post members_api_guild_url(Guild.first), headers: user_1_access, params: { member_ids: [user_2.id] }
      expect(response.status).to eq 401
    end
    it 'should return error => param missing' do
      post members_api_guild_url(Guild.first), headers: access_token
      expect(response.status).to eq 422
      expect(json["error"]).to eq "param is missing or the value is empty: member_ids"
    end
    it 'should not add a member who is already member of a guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
      post members_api_guild_url(Guild.last), headers: access_token_2, params: { member_ids: [user_1.id] }
      expect(Guild.last.members.count).to eq 1
      expect(User.find(user_1.id).guild).to eq Guild.first
      expect(response.status).to eq 422
      expect(json["error"]).to eq "User already has a guild"
    end
    it 'should destroy a member' do
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id, user_2.id] }
      delete members_api_guild_url(Guild.first, user_1.id), headers: access_token
      expect(Guild.first.members.count).to eq 2
      expect(user_1.guild).to_not eq Guild.first
      expect(response.status).to eq 204
    end
    it 'should not destroy a member of another guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
      delete members_api_guild_url(Guild.last, user_1.id), headers: access_token_2
      expect(User.find( user_1.id).guild).to eq Guild.first
      expect(response.status).to eq 422
    end
    context 'if owner leaves' do
      it 'should destroy guild if he is the last to leave' do
        delete members_api_guild_url(Guild.first, auth.id), headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first).to eq nil
      end
      it "should give ownership to first officer and demote him" do
        post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
        post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id] }
        delete members_api_guild_url(Guild.first, auth.id), headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first.owner).to eq user_1
        expect(GuildOfficer.where(guild_id: Guild.first.id, user_id: user_1.id)[0]).to eq nil
      end
      it "should give ownership to first member" do
        post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
        delete members_api_guild_url(Guild.first, auth.id), headers: access_token
        expect(response.status).to eq 204
        expect(Guild.first.owner).to eq user_1
      end
    end
  end

  describe "#officers" do
    before {
      post api_guilds_url, headers: access_token, params: attributes
      post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id, user_2.id] }
    }
    it '(owner) should add officers' do
      post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id, user_2.id] }
      expect(Guild.first.officers.count).to eq 2
      expect(response.status).to eq 200
    end
    it 'should return error => param missing' do
      post officers_api_guild_url(Guild.first), headers: access_token
      expect(response.status).to eq 422
      expect(json["error"]).to eq "param is missing or the value is empty: officer_ids"
    end
    it 'should not add an officer who is already officer in another guild' do
      post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id] }
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post officers_api_guild_url(Guild.last), headers: access_token_2, params: { officer_ids: [user_1.id] }
      expect(Guild.last.officers.count).to eq 0
      expect(response.message).to eq 'Not Found'
    end
    it '(owner) should destroy an officer' do
      post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id, user_2.id] }
      delete officers_api_guild_url(Guild.first, user_1.id), headers: access_token
      expect(Guild.first.officers.count).to eq 1
      expect(response.status).to eq 204
    end
    it 'should not destroy an officer of another guild' do
      post officers_api_guild_url(Guild.first), headers: access_token, params: { officer_ids: [user_1.id] }
      post api_guilds_url, headers: access_token_2, params: attributes_2
      delete officers_api_guild_url(Guild.last, user_1.id), headers: access_token_2
      expect(response.message).to eq 'Not Found'
      expect(Guild.first.officers.count).to eq 1
    end
  end
end
