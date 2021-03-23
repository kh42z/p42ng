require 'rails_helper'

RSpec.describe "Wars", type: :request do
  let(:auth) { create(:user) }
  let(:auth_2) { create(:user) }
  let(:access_token) { auth.create_new_auth_token }
  let(:access_token_2) { auth_2.create_new_auth_token }
  let(:valid_attributes) { { on: Guild.last.id, war_start: DateTime.now, war_end: DateTime.new(2022, 01, 01, 00, 00, 0), prize: 1000, max_unanswered: 10 } }
  before {
    post api_guilds_url, headers: access_token, params: { name: "NoShroud", anagram: "NOS" }
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
    it 'should not let a member create a war' do
      user_1 = create(:user)
      user_1_access = user_1.create_new_auth_token
      post "/api/guilds/#{Guild.first.id}/members/#{user_1.id}", headers: access_token
      post api_wars_url, headers: user_1_access, params: valid_attributes
      expect(response.status).to eq 403
      expect(response.message).to eq 'Forbidden'
      expect(War.count).to eq 0
    end
    it 'should not let declare a war against himself' do
      valid_attributes = { on: Guild.first.id, war_start: DateTime.now, war_end: DateTime.new(2022, 03, 10, 11, 11, 0), prize: 1000, max_unanswered: 10 }
      post api_wars_url, headers: access_token, params: valid_attributes
      expect(response.status).to eq 422
      expect(War.count).to eq(0)
    end
  end
  describe "#update" do
    before { post api_wars_url, headers: access_token, params: valid_attributes }
    it 'should update a war' do
      put api_war_url(War.first.id), headers: access_token_2, params: { war_end: DateTime.new(2022, 03, 10, 11, 11, 0), max_unanswered: 12 }
      expect(response.status).to eq 200
      expect(War.first.war_end).to eq(DateTime.new(2022, 03, 10, 11, 11,0))
      expect(War.first.max_unanswered).to eq(12)
    end
    it 'should not let owner update after creation' do
      put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 12 }
      expect(response.status).to eq 403
      expect(json['errors']).to eq ['Your opponent has not negotiated war terms yet']
    end
    it 'should let update works alternately' do
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 12 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 11 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 10 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 9 }
      expect(response.status).to eq 200
    end
    it 'should not let same user update war twice' do
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 12 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 11 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 10 }
      expect(response.status).to eq 200
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 9 }
      expect(response.status).to eq 403
    end
    it 'should not let update if terms are accepted' do
      post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
      put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 8 }
      expect(json['errors']).to eq ['War terms have been accepted, cannot update anymore']
      expect(response.status).to eq 403
    end
  end
  describe "#create_war_time" do
    before { post api_wars_url, headers: access_token, params: valid_attributes }
    it 'should create a war time' do
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021,1,1), end: DateTime.new(2022,1,1) }
      expect(response.status).to eq 201
    end
    it 'should not create entangled war time (start dates entangled)' do
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021,1,1), end: DateTime.new(2022,6,6) }
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021,2,2), end: DateTime.new(2022,1,1) }
      expect(response.status).to eq 403
      expect(json['errors']).to eq ['Entity dates are entangled with another one']
    end
    it 'should not create entangled war time (end dates entangled)' do
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2022), end: DateTime.new(2024) }
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021), end: DateTime.new(2023) }
      expect(response.status).to eq 403
      expect(json['errors']).to eq ['Entity dates are entangled with another one']
    end
  end
  describe "#destroy_war_time" do
    before {
      post api_wars_url, headers: access_token, params: valid_attributes
      post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021,1,1), end: DateTime.new(2022,1,1) }
    }
    it 'should destroy a war time' do
      delete times_api_war_url(War.first.id), headers: access_token, params: { tid: WarTime.first.id }
      expect(response.status).to eq 204
      expect(WarTime.count).to eq 0
    end
    it 'should not destroy a war time if terms accepted' do
      post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
      delete times_api_war_url(War.first.id), headers: access_token, params: { tid: WarTime.first.id }
      expect(response.status).to eq 403
      expect(WarTime.count).to eq 1
    end
  end
  describe '#agreement' do
    before { post api_wars_url, headers: access_token, params: valid_attributes }
    it 'should agree war terms' do
      post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
      expect(War.first.from_agreement).to be_truthy
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
      expect(response.status).to eq 201
      expect(War.first.on_agreement).to be_truthy
      expect(War.first.terms_agreed).to be_truthy
    end
    context 'if one side has agreed terms,' do
      it 'should not let update' do
        post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
        put api_war_url(War.first.id), headers: access_token, params: { max_unanswered: 8 }
        expect(response.status).to eq 403
        expect(json['errors']).to eq ['One side has agree war terms, accept or decline agreement']
      end
      it 'should not let create war_times' do
        post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
        post times_api_war_url(War.first.id), headers: access_token, params: { start: DateTime.new(2021,1,1), end: DateTime.new(2022,1,1) }
        expect(response.status).to eq 403
        expect(json['errors']).to eq ['One side has agree war terms, accept or decline agreement']
      end
    end
  end
  describe '#wars_entangled?' do
    before {
      post api_wars_url, headers: access_token, params: valid_attributes
      post api_wars_url, headers: access_token_2, params: { on: Guild.first.id, war_start: DateTime.now, war_end: DateTime.new(2022, 01, 01, 00, 00, 0), prize: 1000, max_unanswered: 10 }
      post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
    }
    it 'should consider war with agreed terms (start dates entangled)' do
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
      post agreements_api_war_url(War.last.id), headers: access_token, params: { agree_terms: true }
      expect(json['errors']).to eq ['Entity dates are entangled with another one']
      expect(response.status).to eq 403
    end
    it 'should consider war with agreed terms (end dates entangled)' do
      post api_wars_url, headers: access_token_2, params: { on: Guild.first.id, war_start: DateTime.new(2020, 1, 1), war_end: DateTime.new(2021, 6, 6), prize: 1000, max_unanswered: 10 }
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
      post agreements_api_war_url(War.last.id), headers: access_token, params: { agree_terms: true }
      expect(json['errors']).to eq ['Entity dates are entangled with another one']
      expect(response.status).to eq 403
    end
    it 'should not consider war without agreed terms' do
      expect(response.status).to eq 201
    end
  end
  describe 'War Closed' do
    let(:attributes) { { on: Guild.last.id, war_start: DateTime.now, war_end: DateTime.now.in_time_zone(1).in(2), prize: 1000, max_unanswered: 10 } }
    before {
      post api_wars_url, headers: access_token, params: attributes
      post agreements_api_war_url(War.first.id), headers: access_token, params: { agree_terms: true }
      post agreements_api_war_url(War.first.id), headers: access_token_2, params: { agree_terms: true }
    }
    it 'should close war at war_end' do
      perform_enqueued_jobs
      expect(War.first.war_closed).to eq true
    end
    it 'should not let update closed war', test:true do
      perform_enqueued_jobs
      put api_war_url(War.first.id), headers: access_token_2, params: { max_unanswered: 12 }
      expect(json['errors']).to eq ["This war has ended"]
    end
  end
end
