require "rails_helper"

RSpec.describe "GameRecords", type: :request do
  let!(:auth) { create(:user) }

  describe "requires auth token" do
    before do
      get api_game_records_url
    end
    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end
  end

  describe "retrieves all games played" do
    context "search with user_id" do
      before do
        create_list(:gameRecord, 3)
        get "/api/game_records", headers: auth.create_new_auth_token, params: {user_id: User.last.id, type_id: 1}
      end
      it "returns records" do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "everything" do
      before do
        create_list(:gameRecord, 3)
        get "/api/game_records", headers: auth.create_new_auth_token
      end
      it "returns all played matchs" do
        expect(json).not_to be_empty
        expect(json.size).to eq(3)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end
end
