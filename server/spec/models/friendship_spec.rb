require 'rails_helper'

RSpec.describe Friendship, type: :model do
  it 'should have correct association' do
    should belong_to(:user)
  end
end
