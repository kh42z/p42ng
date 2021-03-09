require 'rails_helper'

RSpec.describe GuildMember, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:guild) }
  it { should belong_to(:user) }
  it { should belong_to(:guild) }
end
