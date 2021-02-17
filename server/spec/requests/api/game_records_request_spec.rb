require 'rails_helper'

RSpec.describe 'GameRecords', type: :request do
  let!(:matchs) { create_list(:gameRecord, 3) }
  let!(:auth) { create(:user) }
  describe 'retrieves all matchs' do

    context 'search with user_id' do
      before {
        get '/api/game_records', headers: auth.create_new_auth_token, params: {user_id: User.first.id, type_id: 1}
      }
      it 'returns records' do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'everything'  do
      before { get '/api/game_records', headers: auth.create_new_auth_token }
      it 'returns all played matchs' do
        expect(json).not_to be_empty
        expect(json.size).to eq(3)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end
end