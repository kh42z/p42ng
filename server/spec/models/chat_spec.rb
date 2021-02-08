require 'rails_helper'

RSpec.describe Chat, type: :model do
  it { should validate_presence_of(:privacy) }
  it { should validate_presence_of(:password) }
  it { should belong_to(:owner) }
end