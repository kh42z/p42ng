require 'rails_helper'

RSpec.describe UserIgnore, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:user_ignored) }
  it 'should have correct association' do
    should belong_to(:user)
    should belong_to(:user_ignored)
  end
end
