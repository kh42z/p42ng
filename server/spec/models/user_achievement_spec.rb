require 'rails_helper'

RSpec.describe UserAchievement, type: :model do
  it 'should have correct association' do
    should have_many(:achievements)
    should belong_to(:user)
  end
end
