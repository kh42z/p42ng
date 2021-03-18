# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Games', type: :request do
  let!(:auth) { create(:user) }

  describe 'requires auth token' do
    before do
      get '/api/games'
    end
    it 'returns status code 401' do
      expect(response).to have_http_status(401)
      expect(json).to_not be_empty
    end
  end

  describe 'retrieves all games played' do
    context 'search with user_id' do
      before do
        create_list(:game, 2)
        get '/api/games', headers: auth.create_new_auth_token, params: { user_id: User.last.id, mode: 'duel' }
      end
      it 'returns all games played' do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json).to_not be_empty
      end
    end

    context 'search with user_id and status' do
      before do
        create_list(:game, 2)
        Game.first.update!(status: 'inprogress')
        get '/api/games', headers: auth.create_new_auth_token, params: { status: 'inprogress' }
      end
      it 'returns all games played' do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    context 'everything' do
      before do
        create_list(:game, 2)
        get '/api/games', headers: auth.create_new_auth_token
      end
      it 'returns all played matchs' do
        expect(json.size).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'create' do
      describe 'a valid duel game' do
        it 'returns status code 201' do
          to = create(:user, status: 'online')
          create(:game)
          auth.update(status: 'online')
          expect do
            post '/api/games', headers: auth.create_new_auth_token,
                               params: { mode: 'duel', opponent_id: to.id }
          end.to have_broadcasted_to("user_#{to.id}").exactly(:once).with(sender_id: auth.id, action: "game_invitation", id: Game.maximum(:id).next)
          expect(response).to have_http_status(201)
          expect(json).not_to be_empty
        end
      end

      describe 'a duel with an already ingame player' do
        before do
          to = create(:user, status: 'ingame')
          auth.update(status: 'online')
          post '/api/games', headers: auth.create_new_auth_token, params: { mode: 'duel', opponent_id: to.id }
        end

        it 'returns status code 403' do
          expect(response).to have_http_status(403)
          expect(json).not_to be_empty
        end
      end

      it 'a duel game without opponent_id' do
        post '/api/games', headers: auth.create_new_auth_token, params: { mode: 'duel' }
        expect(response).to have_http_status(422)
        expect(json).not_to be_empty
      end

      it 'already in another duel game' do
        create(:game, player_right: auth, status: 'pending')
        to = create(:user, status: 'online')
        post '/api/games', headers: auth.create_new_auth_token, params: { mode: 'duel', opponent_id: to.id }
        expect(response).to have_http_status(422)
        expect(json).not_to be_empty
      end

      it 'already in another duel game' do
        from = create(:user, status: 'online')
        auth.update!(status: 'online')
        create(:game, player_left: auth, status: 'pending')
        post '/api/games', headers: from.create_new_auth_token, params: { mode: 'duel', opponent_id: auth.id }
        expect(response).to have_http_status(422)
        expect(json).not_to be_empty
      end
    end

    context 'delete' do
      describe 'cancel invitation' do
        before do
          create_list(:game, 2)
          delete "/api/games/#{Game.first.id}", headers: auth.create_new_auth_token
        end
        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end
      end
      describe 'is not allowed after game started' do
        before do
          game = create(:game)
          game.update!(status: 'played')
          delete "/api/games/#{game.id}", headers: auth.create_new_auth_token
        end
        it 'returns status code 403' do
          expect(response).to have_http_status(403)
          expect(json).not_to be_empty
        end
      end
    end
  end
end
