require 'rails_helper'

RSpec.describe ChatParticipant, type: :model do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:chat) }
  it { should belong_to(:user) }
  it { should belong_to(:chat) }

  # describe 'checks attributes' do
  #   it "expects 'Mark' to be a chat participant" do
  #     participant = create(:user, nickname: "Mark")
  #     owner = create(:user, nickname: "Tom")
  #     chat = create(:chat, owner: owner)
  #     expect(Chat).to have_attributes(user_id: participant.id owner.id)
  #     expect(Chat.owner.nickname).to eq("Tom")
  #     expect(Chat.participants).to eq("Tom")
  #   end
  # end
end
