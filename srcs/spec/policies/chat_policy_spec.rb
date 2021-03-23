require 'rails_helper'

describe ChatPolicy do
  subject { described_class }
  let(:user) { create(:user) }
  let(:superuser) { create(:user, admin: true) }
  let!(:owner) { create(:user) }
  let!(:chat) { create(:chat, name: 'chatroom', owner: owner) }
  let(:admin) { create(:user_admin_of_chat, chat: chat) }
  let(:member) { create(:user_of_chat, chat: chat) }

  # only owner && superuser
  [:update?].each do |e|
    permissions e do
      it "allows #{e} if owner" do
        expect(subject).to permit(owner, chat)
      end
      it "allows #{e} if superuser" do
        expect(subject).to permit(superuser, chat)
      end
      it "denies #{e} if admin" do
        expect(subject).not_to permit(admin, chat)
      end
      it "denies #{e} if user" do
        expect(subject).not_to permit(user, chat)
      end
      it "denies #{e} if member" do
        expect(subject).not_to permit(member, chat)
      end
    end
  end

  # chat admin, owner, superuser
  [:kick?, :mutes?, :invites?, :promote?, :demote?].each do |e|
    permissions e do
      it "allows #{e} if owner" do
        expect(subject).to permit(owner, chat)
      end
      it "allows #{e} if superuser" do
        expect(subject).to permit(superuser, chat)
      end
      it "allows #{e} if admin" do
        expect(subject).to permit(admin, chat)
      end
      it "denies #{e} if user" do
        expect(subject).not_to permit(user, chat)
      end
      it "denies #{e} if member" do
        expect(subject).not_to permit(member, chat)
      end
    end
  end
end
