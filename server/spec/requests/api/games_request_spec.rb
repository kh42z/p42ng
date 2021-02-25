require "rails_helper"

RSpec.describe "Games", type: :request do
  let!(:auth) { create(:user) }

  describe "requires auth token" do
    before do
      get "/api/games"
    end
    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end
  end

  describe "retrieves all games played" do
    context "search with user_id" do
      before do
        create_list(:game, 2)
        get "/api/games", headers: auth.create_new_auth_token, params: {user_id: User.last.id, game_type: "duel"}
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
        create_list(:game, 2)
        get "/api/games", headers: auth.create_new_auth_token
      end
      it "returns all played matchs" do
        expect(json).not_to be_empty
        expect(json.size).to eq(2)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "create" do
      describe "a valid duel game" do
        before do
          to = create(:user, status: "online")
          auth.update(status: "online")
          post "/api/games", headers: auth.create_new_auth_token, params: {game_type: "duel", opponent_id: to.id}
        end

        it "returns status code 200" do
          expect(response).to have_http_status(200)
        end
      end

      describe "a duel with an already ingame player" do
        before do
          to = create(:user, status: "ingame")
          auth.update(status: "online")
          post "/api/games", headers: auth.create_new_auth_token, params: {game_type: "duel", opponent_id: to.id}
        end

        it "returns status code 422" do
          expect(response).to have_http_status(422)
        end
      end

      describe "a duel game without opponent_id" do
        before do
          post "/api/games", headers: auth.create_new_auth_token, params: {game_type: "duel"}
        end

        it "returns status code 422" do
          expect(response).to have_http_status(422)
        end
      end
    end
    context "delete" do
      describe "cancel invitation" do
        before do
          create_list(:game, 2)
          delete "/api/games/#{Game.first.id}", headers: auth.create_new_auth_token
        end
        it "returns status code 204" do
          expect(response).to have_http_status(204)
        end
      end
      describe "is not allowed after game started" do
        before do
          game = create(:game)
          game.update!(state: 2)
          delete "/api/games/#{game.id}", headers: auth.create_new_auth_token
        end
        it "returns status code 403" do
          expect(response).to have_http_status(403)
        end
      end
    end
  end
end
