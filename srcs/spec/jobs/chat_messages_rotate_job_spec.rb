# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatMessagesRotateJob, type: :job do
  it 'prunes every chat_messages except the last 10' do
    chat_full = FactoryBot.create(:chat_with_messages, messages_count: 15)
    chat = FactoryBot.create(:chat)
    ActiveJob::Base.queue_adapter = :test
    ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
    ChatMessagesRotateJob.perform_later
    expect(ChatMessagesRotateJob).to have_been_performed
    expect(ChatMessage.where(chat: chat_full).count).to eq(10)
  end
end
