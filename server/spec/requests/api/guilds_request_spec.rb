# frozen_string_literal: true

require "rails_helper"

describe "Guild API", type: :request do
  let!(:user) { create(:user) }
  let!(:officer_1) { create(:user) }
  let!(:officer_2) { create(:user) }
  let!(:guilds) { create_list(:guild_with_officers, 5) }
  let!(:guild_id) { guilds.first.id }
  let!(:valid_attributes) {
    {name: "Updated", anagram: "upd4t",
     owner_id: user.id,
     officer_ids: [FactoryBot.create(:user).id, FactoryBot.create(:user).id]}
  }
  describe "GET /guilds" do
    before do
      get "/api/guilds"
    end

    it "returns all guilds" do
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(5)
    end
  end

  describe "Creates a guild" do
    before do
      @params = FactoryBot.attributes_for(:guild)
      @params['officer_ids'] = [officer_1.id, officer_2.id] #[User.first.id, User.last.id]
    end

    it "returns status code 201" do
      post "/api/guilds/", params: {guild: @params}
      expect(response).to have_http_status(201)
    end

    it "should create a guild" do
      expect { post "/api/guilds/", params: {guild: @params} }.to change { Guild.count }.by(1)
    end
end

  describe 'retrieves one guild' do
    before { get "/api/guilds/#{guild_id}" }
    it 'returns user' do
      expect(json).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe "Update one guild" do
    before do
      put "/api/guilds/#{guild_id}", params: {guild: valid_attributes}
    end

    it "owner_id to be update" do
      expect(Guild.find(guild_id).name).to eq("Updated")
      expect(Guild.find(guild_id).guild_officers.count).to eq(2)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "delete one guild" do
    before do
      delete "/api/guilds/#{guild_id}"
    end
    it "returns status code 204" do
      expect(response).to have_http_status(204)
    end
  end
end
