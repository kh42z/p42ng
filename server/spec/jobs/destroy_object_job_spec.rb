require 'rails_helper'

RSpec.describe DestroyObjectJob, type: :job do
  describe "#perform_later" do
    it "delete an ChatBan after some times" do
      chat_ban = create(:chat_ban)
      ActiveJob::Base.queue_adapter = :test
      expect { DestroyObjectJob.perform_later(chat_ban) }.to have_enqueued_job
      expect(ChatBan.count).to eq(1)
    end
    it "deletes a ChatBan directly" do
      chat_ban = create(:chat_ban)
      ActiveJob::Base.queue_adapter = :test
      ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
      DestroyObjectJob.perform_later(chat_ban)
      expect(DestroyObjectJob).to have_been_performed
      expect(ChatBan.count).to eq(0)
    end
  end
end
