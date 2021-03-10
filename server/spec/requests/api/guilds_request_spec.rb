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
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 2
      expect(response.status).to eq 200
    end
    it 'should let officers add members' do
      user_1_access = user_1.create_new_auth_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_2.id}", headers: user_1_access
      expect(Guild.first.officers.count).to eq 1
      expect(response.status).to eq 200
    end
    it 'should not let members add members' do
      user_1_access = user_1.create_new_auth_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_2.id}", headers: user_1_access
      expect(response.status).to eq 401
    end
    it 'should not add a member who is already member of a guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post "/api/guilds/#{Guild.last.id}/members/#{user_1.id}", headers: access_token_2
      expect(json["message"]).to eq "Validation failed: User has already been taken"
      expect(GuildMember.where(user_id: user_1.id, guild_id: Guild.last.id)[0]).to eq nil
    end
    it 'should destroy a member' do
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 2
      delete "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      expect(Guild.first.members.count).to eq 1
      expect(response.status).to eq 200
    end
    it 'should not destroy a member of another guild' do
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      delete "/api/guilds/#{Guild.last.id}/members/#{user_1.id}", headers: access_token_2
      expect(GuildMember.where(user_id: user_1.id, guild_id: Guild.first.id)).to exist
    end
    context 'if owner leaves' do
      it 'should destroy guild if he is the last to leave' do
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 200
        expect(auth.guild_id).to eq nil
        expect(Guild.first).to eq nil
      end
      it "should give ownership to first officer and demote him" do
        post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
        post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 200
        expect(Guild.first.owner).to eq user_1
        expect(User.find(user_1.id).guild_id).to eq Guild.first.id
        expect(GuildOfficer.where(guild_id: Guild.first.id, user_id: user_1.id)[0]).to eq nil
      end
      it "should give ownership to first member", test:true do
        post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
        delete "/api/guilds/#{Guild.first.id}/members/#{auth.id}", headers: access_token
        expect(response.status).to eq 200
        expect(User.find(user_1.id).guild_id).to eq Guild.first.id
        expect(Guild.first.owner).to eq user_1
      end
    end
  end

  describe "#officers" do
    before {
      post api_guilds_url, headers: access_token, params: attributes
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
    }
    it '(owner) should add officers' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
      expect(response.status).to eq 200
    end
    it 'should not add an officer who is already officer in another guild' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post api_guilds_url, headers: access_token_2, params: attributes_2
      post "/api/guilds/#{Guild.last.id}/officers/#{user_1.id}", headers: access_token_2
      expect(Guild.last.officers.count).to eq 0
      expect(json["message"]).to eq "Validation failed: User has already been taken"
    end
    it 'should not promote a member as officer twice' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 1
      expect(json["message"]).to eq "Validation failed: User has already been taken"
    end
    it '(owner) should destroy an officer' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      delete "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      expect(Guild.first.officers.count).to eq 0
      expect(response.status).to eq 200
    end
    it 'should not destroy an officer of another guild' do
      post "/api/guilds/#{Guild.first.id}/officers/#{user_1.id}", headers: access_token
      post api_guilds_url, headers: access_token_2, params: attributes_2
      delete "/api/guilds/#{Guild.last.id}/officers/#{user_1.id}", headers: access_token_2
      expect(Guild.first.officers.count).to eq 1
    end
  end
end
