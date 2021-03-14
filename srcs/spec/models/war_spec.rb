require 'rails_helper'

RSpec.describe War, type: :model do
  it 'should validate presence of attributes' do
    should validate_presence_of(:from)
    should validate_presence_of(:on)
    should validate_presence_of(:war_start)
    should validate_presence_of(:war_end)
    should validate_presence_of(:prize)
    should validate_presence_of(:from_score)
    should validate_presence_of(:on_score)
    should validate_presence_of(:max_unanswered)
  end

  it 'should have correct association' do
    should belong_to(:guild)
    should have_many(:war_addons)
    should have_one(:war_time)
  end
end
