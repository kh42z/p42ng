require 'rails_helper'

RSpec.describe "TwoFactor", type: :request do

  describe "Valid code" do
    before do
      user = FactoryBot.create(:user, two_factor: true, two_factor_code: "secure")
      get "/two_factor/#{user.id}/", params: {"code": "secure"}
    end

    it "returns user token" do
      expect(json).not_to be_empty
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end
  describe "Invalid code" do
    before do
      user = FactoryBot.create(:user, two_factor: true, two_factor_code: "invalid")
      get "/two_factor/#{user.id}/", params: {"code": "secure"}
    end

    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end
  end

  describe "2FA disabled" do
    before do
      user = FactoryBot.create(:user, two_factor: false, two_factor_code: "secure")
      get "/two_factor/#{user.id}/", params: {"code": "secure"}
    end

    it "returns status code 401" do
      expect(response).to have_http_status(401)
    end
  end
end
