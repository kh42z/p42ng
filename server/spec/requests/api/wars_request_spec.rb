require 'rails_helper'

RSpec.describe "Wars", type: :request do
  let(:auth) { create(:user, nickname: "Tom") }
  let(:access_token) { auth.create_new_auth_token }
  let(:user) { create(:user, nickname: "Matt") }
  let(:access_token_2) { user.create_new_auth_token }
  let(:valid_attributes) { { from: Guild.first.id, on: Guild.last.id, war_start: DateTime.now, war_end: DateTime.new(2021, 03, 10, 11, 11, 0), prize: 1000, max_unanswered: 10 } }
  before {
    post api_guilds_url, headers: access_token, params: { name: "NoShroud", anagram: "NOSDO", officer_ids: [auth.id] }
    post api_guilds_url, headers: access_token_2, params: { name: "BANG", anagram: "ABCDE" }
  }
  describe "#index" do
    it 'should return wars' do
      create_list(:war, 2)
      get api_wars_url, headers: access_token
      expect(response).to have_http_status(200)
      expect(War.count).to eq(2)
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
  end
  describe "#update", test:true do
    it 'should update a war' do
      post api_wars_url, headers: access_token, params: valid_attributes
      put api_war_url(War.first.id), headers: access_token, params: { war_end: DateTime.new(2022, 03, 10, 11, 11, 0), max_unanswered: 12 }
      expect(response.status).to eq 200
      expect(War.first.war_end).to eq(DateTime.new(2022, 03, 10, 11, 11,0))
      expect(War.first.max_unanswered).to eq(12)
    end
  end
end
