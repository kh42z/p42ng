# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GameEngineJob, type: :job do
  include(CacheHelper)
  let!(:player_left) { create(:user, status: 'offline') }
  let!(:player_right) { create(:user, status: 'offline') }
  let!(:game) { create(:game, player_left: player_left, player_right: player_right) }
  it 'starts pongEngine' do
    ActiveJob::Base.queue_adapter = :test
    ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
    GameEngineJob.perform_later(game, 1)
    game.reload
    expect(game.state).to eq(3)
    player_left.reload
    expect(player_left.status).to eq('online')
  end
end
