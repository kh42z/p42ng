# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatMessage, type: :model do
  it { should belong_to(:sender) }
  it { should belong_to(:chat) }
  it { should validate_presence_of(:content) }
  it { should validate_length_of(:content).is_at_most(300) }
end
