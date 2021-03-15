require "rails_helper"

RSpec.describe TwoFactorMailer, type: :mailer do
  describe "#reset" do
    let(:user) { create(:user) }
    let(:mail) { TwoFactorMailer.with(user: user, code: "0000").reset_email }
    it "renders the headers" do
      expect(mail.subject).to eq("Pong: Your code!")
    end
    it "renders the body" do
      expect(mail.body.encoded).to match("0000")
      expect(mail.body.encoded).to match(user.nickname)
    end
  end
end
