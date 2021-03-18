# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActivityChannel, type: :channel do
  let!(:current_user) { create(:user) }

  describe 'User' do
    it 'should subscribe' do
      stub_connection current_user: current_user
      subscribe(id: current_user.id)
      expect(subscription).to be_confirmed
      unsubscribe
    end
  end
end
