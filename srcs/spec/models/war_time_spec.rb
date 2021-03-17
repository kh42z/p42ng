# frozen_string_literal: true

require 'rails_helper'

RSpec.describe WarTime, type: :model do
  it 'should validate presence of attributes' do
    should validate_presence_of(:start)
    should validate_presence_of(:end)
  end

  it 'should have correct association' do
    should belong_to(:war)
  end
end
