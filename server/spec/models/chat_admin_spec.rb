require 'rails_helper'

RSpec.describe ChatAdmin, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:chat) }
  it { should belong_to(:user) }
  it { should belong_to(:chat) }

  describe 'checks attributes' do
    let(:user) { create(:user, nickname: "Tom") }
    let(:chat) { create(:chat, owner: user) }
    subject { described_class.new(chat_id: chat.id, user_id: user.id) }
    it "expects 'TOM' to be chat admin et owner" do
      expect(subject).to have_attributes(user_id: user.id)
      expect(subject.chat.owner.nickname).to eq("Tom")
    end
  end

end
