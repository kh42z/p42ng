require "rails_helper"

RSpec.describe "Games", type: :request do
  let!(:auth) { create(:user) }

  describe "requires auth token" do
    before do
      get '/api/games'
    end
    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end
  end

  describe "retrieves all games played" do
    context "search with user_id" do
      before do
        create_list(:game, 3)
        Game.update_all(game_type_id: GameType.first.id)
        get "/api/games", headers: auth.create_new_auth_token, params: {user_id: User.last.id, game_type_id: GameType.first.id}
      end
      it "returns all games played" do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "everything" do
      before do
        create_list(:game, 3)
        get "/api/games", headers: auth.create_new_auth_token
      end
      it "returns all played matchs" do
        expect(json).not_to be_empty
        expect(json.size).to eq(3)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "create" do
      before do
        GameType.create(name: "Ladder", id: 2)
        post "/api/games", headers: auth.create_new_auth_token, params: {game_type_id: 2}
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end
end
