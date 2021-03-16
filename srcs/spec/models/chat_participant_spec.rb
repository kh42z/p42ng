# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatParticipant, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:chat) }
  it { should belong_to(:user) }
  it { should belong_to(:chat) }
end
