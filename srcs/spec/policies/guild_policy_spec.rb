require 'rails_helper'

describe GuildPolicy do
  include(CacheHelper)
  include_context 'with cache'
  let!(:user) { create(:user) }
  let!(:guild) { create(:guild) }
  let!(:owner) { create(:user_with_guild, guild: guild, rank: 'owner') }
  let!(:member) { create(:user_with_guild, guild: guild, rank: 'member') }
  let!(:officer) { create(:user_with_guild, guild: guild, rank: 'officer') }
  subject { described_class }

  permissions :update? do
    it "allows update if member is owner" do
      expect(subject).to permit(owner, guild)
    end
    it "denies update if member is officer" do
      expect(subject).not_to permit(officer, guild)
    end
    it "denies update if member" do
      expect(subject).not_to permit(member, guild)
    end
  end

  permissions :accept_invites? do
    it "allows join" do
      guild_invite_user(guild.id, user.id)
      expect(subject).to permit(user, guild)
    end

    it "denies join" do
      expect(subject).not_to permit(user, guild)
    end
  end

  permissions :refuse_invitation? do
    it "allows cancel" do
      guild_invite_user(guild.id, user.id)
      expect(subject).to permit(user, guild)
    end

    it "denies cancel" do
      expect(subject).not_to permit(user, guild)
    end
  end

  [:create_members?, :destroy_members?, :create_officers?, :destroy_officers?, :create_invitation?].each do |e|
    permissions e do
      it "allows #{e} if member is an officer" do
        expect(subject).to permit(officer, guild)
      end
      it "allows #{e} if user is owner" do
        expect(subject).to permit(owner, guild)
      end
      it "denies #{e} if user is member" do
        expect(subject).not_to permit(member, guild)
      end
      it "denies #{e} if user is not member" do
        expect(subject).not_to permit(user, guild)
      end
    end
  end
end