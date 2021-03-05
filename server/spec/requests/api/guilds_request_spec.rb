# frozen_string_literal: true

require "rails_helper"

describe "Guild", type: :request do
  let(:auth) { create(:user, nickname: "Tom") }
  let(:access_token) { auth.create_new_auth_token }
  describe "#get" do
    it "should return guilds" do
      create_list(:guild, 2)
      get api_guilds_url, headers: access_token
      expect(Guild.count).to eq(2)
      expect(response).to have_http_status(:success)
    end
    it "should return guild" do
      guild = create(:guild)
      get api_guild_url(guild), headers: access_token
      expect(Guild.count).to eq(1)
      expect(response).to have_http_status(200)
    end
    it 'should return guild with officers' do
      guild = create(:guild_with_officers)
      get api_guild_url(guild), headers: access_token
      expect(Guild.first.officers.count).to eq(2)
      expect(response).to have_http_status(200)
    end
  end

  describe "#post" do
    context "when the request is valid" do
      it "returns status code 201" do
        params = attributes_for(:guild)
        officer_1, officer_2 = create_list(:user, 2)
        params["officer_ids"] = [officer_1.id, officer_2.id]
        post api_guilds_url, headers: access_token, params: params
        expect(response).to have_http_status(201)
        expect(Guild.first.owner_id).to eq(auth.id)
      end
      context "when the request is invalid" do
        before { post api_guilds_url, headers: access_token }
        it "returns status code 422" do
          expect(response).to have_http_status(422)
        end
        it "returns a validation failure message" do
          expect(response.body).to match("can't be blank")
        end
      end
      it "returns an error message" do
        attributes = { name: "NoShroud", anagram: "NOSDO" }
        attributes_2 = { name: "Bang", anagram: "BBANG" }
        post api_guilds_url, headers: access_token, params: attributes
        post api_guilds_url, headers: access_token, params: attributes_2
        expect(response.body).to match(I18n.t('hasGuildAlready'))
        expect(response).to have_http_status(403)
      end
      it 'should create a guild even with bad officers ID' do
        attributes = { name: "NoShroud", anagram: "NOSDO", officer_ids: [auth.id, 0] }
        post api_guilds_url, headers: access_token, params: attributes
        expect(response.status).to eq 201
        expect(GuildOfficer.count).to eq 1
        expect(GuildOfficer.first.user_id).to eq auth.id
      end
    end

    describe "#update" do
      it "should be updated" do
        guild = create(:guild, owner: auth)
        valid_attributes = { name: "Updated", anagram: "upd4t" }
        put api_guild_url(guild.id), headers: access_token, params: valid_attributes
        expect(Guild.first.name).to eq("Updated")
        expect(Guild.count).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    describe "#members" do
      it 'should add members' do
        user_1, user_2 = create_list(:user, 2)
        attributes = { name: "NoShroud", anagram: "NOSDO" }
        post api_guilds_url, headers: access_token, params: attributes
        post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id, user_2.id] }
        expect(Guild.first.members.count).to eq 3
        expect(response.status).to eq 200
      end
      it 'should destroy a member' do
        user_1, user_2 = create_list(:user, 2)
        attributes = { name: "NoShroud", anagram: "NOSDO" }
        post api_guilds_url, headers: access_token, params: attributes
        post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id, user_2.id] }
        delete members_api_guild_url(Guild.first, user_1.id), headers: access_token
        expect(Guild.first.members.count).to eq 2
        expect(user_1.guild).to_not eq Guild.first
        expect(response.status).to eq 200
      end
      #  it 'should not add a member who is already member of a guild', test:true do
    #    user_1, user_2 = create_list(:user, 2)
    #    attributes = { name: "NoShroud", anagram: "NOSDO" }
    #    post api_guilds_url, headers: access_token, params: attributes
    #    post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
    #    post members_api_guild_url(Guild.first), headers: access_token, params: { member_ids: [user_1.id] }
    #    expect(response.body).to match(I18n.t('hasGuildAlready'))
    #    expect(response.status).to eq 403
    #  end
    end
  end
end
