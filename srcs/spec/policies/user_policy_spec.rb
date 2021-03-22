require 'rails_helper'

describe UserPolicy do
  subject { described_class }

  permissions :update? do
    let(:auth) { create(:user )}
    it "denies ban if user is not admin" do
      expect(subject).not_to permit(auth, create(:user, banned: true))
    end
    it "allows ban if user is admin" do
      expect(subject).to permit(create(:user, admin: true), create(:user, banned: true))
    end
  end


  permissions :create_friendship? do
    let(:auth) { create(:user )}
    it "denies friendship if user is not admin" do
      expect(subject).not_to permit(auth, create(:user))
    end
    it "allows friendship if user is admin" do
      expect(subject).to permit(create(:user, admin: true), create(:user, banned: true))
    end

    it "allows friendship if user modifies himself" do
      expect(subject).to permit(auth, auth)
    end
  end
end

