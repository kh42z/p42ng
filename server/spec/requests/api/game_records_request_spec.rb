require 'rails_helper'

RSpec.describe 'GameRecords', type: :request do
  let!(:matchs) { create_list(:gameRecord, 10) }
  let!(:auth) { create(:user) }
  describe 'retrieves all matchs' do
    before { get '/api/game_records', headers: auth.create_new_auth_token }
    it 'returns all played matchs' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end