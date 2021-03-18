# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserChannel, type: :channel do
  let!(:current_user) { create(:user) }

  describe 'User' do
    it 'should subscribe' do
      stub_connection current_user: current_user
      expect do
        subscribe(id: current_user.id)
      end.to have_broadcasted_to('activity').exactly(:once).with(action: 'user_update_status',
                                                                 id: current_user.id, status: 'online')
      expect(subscription).to be_confirmed
      current_user.reload
      expect(current_user.status).to eq('online')
      unsubscribe
      expect do
        unsubscribe
      end.to have_broadcasted_to('activity').exactly(:once).with(action: 'user_update_status',
                                                                 id: current_user.id, status: 'offline')
      current_user.reload
      expect(current_user.status).to eq('offline')
    end
  end
end
