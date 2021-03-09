require 'rails_helper'

RSpec.describe "Wars", type: :request do
  let(:auth) { create(:user) }
  let(:auth_2) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }
  let(:access_token_2) { auth_2.create_new_auth_token }
  let(:valid_attributes) { { on: Guild.last.id, war_start: DateTime.now, war_end: DateTime.new(2021, 03, 10, 11, 11, 0), prize: 1000, max_unanswered: 10 } }
  before {
    post api_guilds_url, headers: access_token, params: { name: "NoShroud", anagram: "NOSDO" }
    post api_guilds_url, headers: access_token_2, params: { name: "BANG", anagram: "ABCDE" }
  }
  describe "#index" do
    it 'should return wars' do
      create_list(:war, 2)
      get api_wars_url, headers: access_token
      expect(json.size).to eq 2
      expect(response.status).to eq 200
    end
  end
  describe "#show" do
    it 'should return a war' do
      war_1, war_2 = create_list(:war, 2)
      get api_war_url(war_1), headers: access_token
      expect(response.status).to eq 200
      expect(json['id']).to match(war_1.id)
      expect(json['id']).to_not match(war_2.id)
    end
  end
  describe "#create" do
    it 'should declare a war' do
      post api_wars_url, headers: access_token, params: valid_attributes
      expect(response.status).to eq 201
      expect(War.count).to eq(1)
    end
    it 'should let an officer create a war' do
      user_1 = create(:user)
      user_1_access = user_1.create_new_auth_token
      post members_api_guild_url(Guild.first, tid: user_1.id), headers: access_token
      post officers_api_guild_url(Guild.first, tid: user_1.id), headers: access_token
      post api_wars_url, headers: user_1_access, params: valid_attributes
      expect(response.status).to eq 201
      expect(War.count).to eq(1)
    end
    it 'should not let a member create a war', test:true do
      user_1 = create(:user)
      user_1_access = user_1.create_new_auth_token
      post members_api_guild_url(Guild.first, tid: user_1.id), headers: access_token
      post api_wars_url, headers: user_1_access, params: valid_attributes
      expect(response.status).to eq 401
      expect(response.message).to eq 'Unauthorized'
      expect(War.count).to eq 0
    end
    it 'should not let declare a war against himself' do
      valid_attributes = { on: Guild.first.id, war_start: DateTime.now, war_end: DateTime.new(2021, 03, 10, 11, 11, 0), prize: 1000, max_unanswered: 10 }
      post api_wars_url, headers: access_token, params: valid_attributes
      expect(response.status).to eq 422
      expect(War.count).to eq(0)
    end
  end
  # describe "#update" do
  #   it 'should update a war' do
  #     post api_wars_url, headers: access_token, params: valid_attributes
  #     put api_war_url(War.first.id), headers: access_token, params: { war_end: DateTime.new(2022, 03, 10, 11, 11, 0), max_unanswered: 12 }
  #     expect(response.status).to eq 200
  #     expect(War.first.war_end).to eq(DateTime.new(2022, 03, 10, 11, 11,0))
  #     expect(War.first.max_unanswered).to eq(12)
  #   end
  # end
end
