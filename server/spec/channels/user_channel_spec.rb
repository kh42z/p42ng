require 'rails_helper'

RSpec.describe UserChannel, type: :channel do
  let!(:current_user) { create(:user) }

  describe 'User' do
    it "should subscribe" do
      stub_connection current_user: current_user
      subscribe(user_id: current_user.id)
      expect(subscription).to be_confirmed
      current_user.reload
      expect(current_user.status).to eq('online')
      unsubscribe
      current_user.reload
      expect(current_user.status).to eq('offline')
    end
  end
end
