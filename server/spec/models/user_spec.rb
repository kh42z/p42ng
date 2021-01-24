require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:nickname) }
  it { should have_one(:guild_id) }
  it { should have_one(:ladder_id) }
end
