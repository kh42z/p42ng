require 'rails_helper'

describe UserPolicy do
  let(:auth) { create(:user) }
  let(:admin) { create(:user, admin: true)}
  let(:other) { create(:user) }
  subject { described_class }

  [:update?, :upload_avatar?, :create_ignore?, :destroy_ignore?, :create_friendship?, :destroy_friendship?].each do |e|

    permissions e do
      it "denies #{e} if user is not admin" do
       expect(subject).not_to permit(auth, other)
      end
      it "allows #{e} if user is admin" do
       expect(subject).to permit(admin, other)
      end
      it "allows #{e} if user modifies himself" do
        expect(subject).to permit(auth, auth)
      end
    end
  end
end

