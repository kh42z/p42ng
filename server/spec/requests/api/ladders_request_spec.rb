# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Ladders', type: :request do
  let!(:ladders) { create_list(:ladder, 4) }
  let(:ladder_id) { ladder.first.id }


  describe 'retrieves all ladders' do
    before {
      @user = FactoryBot.create(:user)
      get '/api/ladders', headers: @user.create_new_auth_token
    }

    it 'returns ladders' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

  end
end
