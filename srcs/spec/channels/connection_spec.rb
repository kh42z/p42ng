# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationCable::Connection, type: :channel do
  it 'successfully connects' do
    user = FactoryBot.create(:user)
    connect '/cable', headers: user.create_new_auth_token
    expect(connection.current_user.id).to eq user.id
  end

  it 'does not connect' do
    expect { connect '/cable' }.to have_rejected_connection
  end
end
