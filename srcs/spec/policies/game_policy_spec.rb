require 'rails_helper'

describe GamePolicy do
  subject { described_class }
  let!(:invited) { create(:user) }
  let!(:invited2) { create(:user)}
  let!(:played) { create(:game, status: 'played', player_left: invited, player_right: invited2)}
  let!(:pending) { create(:game, status: 'pending', player_left: invited, player_right: invited2)}
  let(:stranger) { create(:user) }


  permissions :destroy? do
    it 'destroy should' do
      expect(subject).not_to permit(stranger, pending)
      expect(subject).not_to permit(invited, played)
      expect(subject).to permit(invited, pending)
    end
  end
end
