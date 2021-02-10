require 'rails_helper'

RSpec.describe "Api::States", type: :request do
  let!(:states) { create_list(:state, 10) }
  let(:state_id) { states.first.id }

  describe 'requires auth token' do
    before {
      get '/api/states'
    }

    it 'returns status code 401' do
      expect(response).to have_http_status(401)
    end
  end

  describe 'retrieves all states' do
    before {
      @user = FactoryBot.create(:user)
      get "/api/states", headers: @user.create_new_auth_token
    }
    it 'returns states' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
  describe 'retrieves one state' do
    before {
      @user = FactoryBot.create(:user)
      get "/api/states/#{state_id}", headers: @user.create_new_auth_token
    }
    it 'returns state' do
      expect(json).not_to be_empty
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
