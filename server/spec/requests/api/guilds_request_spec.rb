# frozen_string_literal: true

require 'rails_helper'

describe 'Guild API', type: :request do
  let!(:guilds) { create_list(:guild, 2) }
  describe 'GET /guilds' do
    before do
      get '/api/guilds'
    end

    it 'returns all guilds' do
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end
end
