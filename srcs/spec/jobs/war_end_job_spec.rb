# frozen_string_literal: true

require 'rails_helper'

RSpec.describe WarEndJob, type: :job do
  it 'closes a war' do
    war = create(:war)
    ActiveJob::Base.queue_adapter = :test
    ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
    WarEndJob.perform_later(war)
    expect(WarEndJob).to have_been_performed
    war.reload
    expect(war.war_closed).to eq(true)
  end
end
