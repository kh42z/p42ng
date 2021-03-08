require 'rails_helper'

RSpec.describe "Api::Achievements", type: :request do
  let!(:current_user) { create(:user) }
  let!(:access_token) { current_user.create_new_auth_token}
  describe "#index" do
    it 'should return achievements' do
      create_list(:achievement, 2)
      get '/api/achievements', headers: access_token
      expect(json.size).to eq 2
      expect(response.status).to eq 200
    end
    it "should get user_achievements where user_id equal" do
      create_list(:achievement_with_users, 1)
      get '/api/achievements', headers: access_token, params: {"user_id": User.last.id}
      expect(response).to have_http_status(200)
      expect(json.size).to eq(1)
    end
  end
end
