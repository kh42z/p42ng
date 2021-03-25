require 'rails_helper'

RSpec.describe WarPolicy, type: :policy do
  let(:user) { create(:user) }
  let!(:guild) { create(:guild, name: "test", anagram: "t3st") }
  let!(:guild_2) { create(:guild, name: "test2", anagram: "t6st") }
  let!(:war) { create(:war, from_id: guild.id, on_id: guild_2.id, war_start: DateTime.now, war_end: DateTime.now + 1, max_unanswered: 5) }
  let(:owner) { create(:user_with_guild, guild: guild, rank: 'owner') }
  let(:member) { create(:user_with_guild, guild: guild, rank: 'member') }
  let(:officer) { create(:user_with_guild, guild: guild, rank: 'officer') }
  subject { described_class }

  [:create?, :update?, :agreements?, :create_times?, :destroy_times?].each do |e|
    permissions e do
      it "allows #{e} to guild owner" do
        expect(subject).to permit(owner, war)
      end
      it "denies #{e} to guild officer" do
        expect(subject).to_not permit(officer, war)
      end
      it "denies #{e} to guild member" do
        expect(subject).to_not permit(member, war)
      end
    end
  end
end
