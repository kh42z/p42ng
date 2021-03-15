require "rails_helper"

RSpec.describe "OmniauthCallbacksController", type: :request do
  describe "Oauth" do
    it "should register a new client" do
      login
      expect(User.all.count).to eq(1)
      expect(response.status).to eq 200
    end

    it "should sign-in an existing client" do
      FactoryBot.create(:user, banned: false, uid: 1000, provider: "marvin", two_factor: false)
      login
      expect(response.status).to eq 200
    end

    it "should not sign-in a banned user" do
      FactoryBot.create(:user, banned: true, uid: 1000, provider: "marvin", two_factor: false)
      login
      expect(response.status).to eq 403
    end

    it "should not sign-in a banned user with 2FA" do
      FactoryBot.create(:user, banned: true, uid: 1000, provider: "marvin", two_factor: true)
      login
      expect(response.status).to eq 403
    end

    it "should not sign-in a user with 2FA" do
      FactoryBot.create(:user, banned: false, uid: 1000, provider: "marvin", two_factor: true, two_factor_code: "1234")
      ActiveJob::Base.queue_adapter = :test
      expect {
        login
      }.to have_enqueued_job(TwoFactorResetJob)
      expect(response.status).to eq 200
    end
  end

  def login
    Rails.application.env_config["devise.mapping"] = Devise.mappings[:user] # If using Devise
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:marvin]
    valid_marvin_login_setup
    get "/auth/marvin", params: {
      auth_origin_url: "http://www.example.com/"
    }
    follow_all_redirects!
  end

  def valid_marvin_login_setup
    if Rails.env.test?
      OmniAuth.config.test_mode = true
      OmniAuth.config.mock_auth[:marvin] = OmniAuth::AuthHash.new({
        provider: "marvin",
        uid: "1000",
        info: {
          nickname: "herve",
          email: "test@example.com",
          image: "https://cdn.42.fr/toto/"
        },
        credentials: {
          token: "123456",
          expires_at: Time.now + 1.week
        },
        extra: {
          raw_info: {
          }
        }
      })
    end
  end

  def follow_all_redirects!
    follow_redirect! while response.status.to_s =~ /^3\d{2}/
  end
end
