require 'rails_helper'

RSpec.describe ChatBansCleanupJob, type: :job do
  describe "#perform_later" do
    it "delete an ChatBan after some times" do
      chat_ban = create(:chat_ban)
      ActiveJob::Base.queue_adapter = :test
      expect {
        ChatBansCleanupJob.perform_later(chat_ban)
      }.to have_enqueued_job
    end
  end
end
