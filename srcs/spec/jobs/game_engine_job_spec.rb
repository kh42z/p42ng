# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GameEngineJob, type: :job do
  include(CacheHelper)
  let!(:player_left) { create(:user) }
  let!(:player_right) { create(:user) }
  let!(:game) { create(:game, player_left: player_left, player_right: player_right) }
  it 'starts pongEngine' do
    ActiveJob::Base.queue_adapter = :test
    ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
    pong = GameEngine.new(game)
    pong.turns_limit = 1
    GameEngineJob.perform_now(pong)
    game.reload
    expect(game.state).to eq(3)
  end
end
