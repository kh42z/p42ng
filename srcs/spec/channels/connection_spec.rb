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

  it 'invalid uid cant connect' do
    user = FactoryBot.create(:user)
    headers = user.create_new_auth_token
    headers['uid'] = 100
    expect { connect '/cable' }.to have_rejected_connection
  end

  it 'prevent from connecting twice' do
    user = FactoryBot.create(:user)
    connect '/cable', headers: user.create_new_auth_token
    expect(connection.current_user.id).to eq user.id
    expect { connect '/cable' }.to have_rejected_connection
    disconnect
    connect '/cable', headers: user.create_new_auth_token
    expect(connection.current_user.id).to eq user.id
  end

end
