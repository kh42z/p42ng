# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GameChannel, type: :channel do
  let!(:player_left) { create(:user) }
  let!(:player_right) { create(:user) }
  let!(:viewer) { create(:user) }
  let!(:game) { create(:game, player_left: player_left, player_right: player_right) }
  describe 'Players' do
    it 'should subscribe' do
      stub_connection current_user: player_left
      subscribe(id: game.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end
    it 'should subscribe' do
      stub_connection current_user: player_right
      subscribe(id: game.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end

    it 'should subscribe even if game isnt started' do
      stub_connection current_user: viewer
      subscribe(id: game.id)
      expect(subscription).to be_confirmed
    end


    it 'shouldnt subscribe if game is closed' do
      stub_connection current_user: player_left
      game.update!(state: 3)
      subscribe(id: game.id)
      expect(subscription).to be_rejected
    end

    it 'disconnects should stop GameEngine' do
      ActiveJob::Base.queue_adapter = :test
      ActiveJob::Base.queue_adapter.perform_enqueued_jobs = false
      stub_connection current_user: player_left
      subscribe(id: game.id)
      stub_connection current_user: player_right
      subscribe(id: game.id)
      # Thread started
      unsubscribe
      stub_connection current_user: player_left
      subscribe(id: game.id)
      # Both players disconnected
    end
  end

  describe 'Game' do
    it 'should start' do
      ActiveJob::Base.queue_adapter = :test
      ActiveJob::Base.queue_adapter.perform_enqueued_jobs = false
      stub_connection current_user: player_left
      subscribe(id: game.id)
      stub_connection current_user: player_right
      expect { subscribe(id: game.id) }.to enqueue_job
      stub_connection current_user: viewer
      subscribe(id: game.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end

    it 'should receive data' do
      stub_connection current_user: player_left
      subscribe(id: game.id)
      # stub_connection current_user: player_right
      # subscribe(id: game.id)
      perform :received, message: { position: 10 }.to_json
    end
  end
end
