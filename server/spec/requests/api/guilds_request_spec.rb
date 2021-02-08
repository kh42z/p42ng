# frozen_string_literal: true

require 'rails_helper'

describe 'Guild API', type: :request do
  describe 'GET /guilds' do
    before do
      FactoryBot.create(:guild, name: "YouThink", anagram: "YITOK")
      FactoryBot.create(:guild, name: "NoShroud", anagram: "NOSRD")
    end

    it 'returns all guilds' do
      get '/api/guilds'
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end
end
