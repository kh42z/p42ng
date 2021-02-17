require 'rails_helper'

RSpec.describe ChatTimeout, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:chat) }
  it { should validate_presence_of(:timeout) }
  it { should belong_to(:user) }
  it { should belong_to(:chat) }
end
