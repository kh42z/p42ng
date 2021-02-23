require 'rails_helper'

RSpec.describe GameChannel, type: :channel do
  let!(:player_left) { create(:user) }
  let!(:player_right) { create(:user) }
  let!(:unknow) { create(:user) }
  let!(:game) { create(:game, player_left: player_left, player_right: player_right) }
  describe 'Players' do
    it "should subscribe" do
      stub_connection current_user: player_left
      subscribe(game_id: game.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end
    it "should subscribe" do
      stub_connection current_user: player_right
      subscribe(game_id: game.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end

    it "shouldnt subscribe" do
      stub_connection current_user: unknow
      subscribe(game_id: game.id)
      expect(subscription).to be_rejected
    end
  end
end
