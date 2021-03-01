require 'rails_helper'

RSpec.describe TwoFactorResetJob, type: :job do
  it "reset a code" do
    user = FactoryBot.create(:user, two_factor: true, two_factor_code: "21")
    ActiveJob::Base.queue_adapter = :test
    ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
    TwoFactorResetJob.perform_later(user)
    expect(TwoFactorResetJob).to have_been_performed
    user.reload
    expect(BCrypt::Password.new(user.two_factor_code_digest) != "21").to eq(true)
  end
end
