# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatParticipant, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:chat) }
  it { should belong_to(:user) }
  it { should belong_to(:chat) }

  it 'should not allow owner duplicate' do
    chat = create(:chat)
    member = create(:chat_participant, chat: chat)
    expect do
      member.owner!
    end.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Role has already been taken')
  end
  it 'should allow member duplicate' do
    create(:chat_participant)
    expect { create(:chat_participant) }.to_not raise_error
  end
end
