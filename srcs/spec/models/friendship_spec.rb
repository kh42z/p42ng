# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Friendship, type: :model do
  it 'should have correct association' do
    should belong_to(:friend_a)
    should belong_to(:friend_b)
  end
end
