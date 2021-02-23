require 'rails_helper'

RSpec.describe WarTerm, type: :model do
  it 'should validate presence of attributes' do
    should validate_presence_of(:start)
    should validate_presence_of(:end)
    should allow_values(true, false).for(:ladder)
    should allow_values(true, false).for(:agreed)
  end

  it 'should have correct association' do
    should belong_to(:war)
    should have_many(:war_addons)
  end
end
