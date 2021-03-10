require 'rails_helper'

RSpec.describe GuildMember, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:guild) }
  it { should allow_values('member', 'officer', 'owner').for(:rank) }
  it { should belong_to(:user) }
  it { should belong_to(:guild) }

  it 'should not allow owner duplicate' do
    guild = create(:guild)
    create(:guild_member, guild: guild, rank: 'owner')
    member = create(:guild_member, guild: guild)
    expect { member.owner! }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Rank has already been taken')
  end
  it 'should allow member duplicate' do
    create(:guild_member)
    expect { create(:guild_member) }.to_not raise_error
  end
end
