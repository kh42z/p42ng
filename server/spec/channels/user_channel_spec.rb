require 'rails_helper'

RSpec.describe UserChannel, type: :channel do
  let!(:current_user) { create(:user) }

  describe 'User' do
    it "should subscribe" do
      State.create(name: "Offline", id: 1)
      State.create(name: "Online", id: 2)
      stub_connection current_user: current_user
      subscribe(user_id: current_user.id)
      expect(subscription).to be_confirmed
      current_user.reload
      expect(current_user.state_id).to eq(2)
      unsubscribe
      current_user.reload
      expect(current_user.state_id).to eq(1)
    end
  end
end
