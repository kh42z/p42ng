require "rails_helper"

RSpec.describe ChatChannel, type: :channel do
  let!(:chats) { create_list(:chat, 3) }
  let!(:current_user) { create(:user) }

  describe 'Participants' do
    it "should subscribe" do
      stub_connection current_user: current_user
      subscribe(chat_id: chats.first.id)
      expect(subscription).to be_confirmed
      expect(ChatParticipant.count).to eq(1)
      unsubscribe
      expect(ChatParticipant.count).to eq(0)
    end
  end

  describe 'Privacy' do
    it "should accept password" do
      chats.last.update!(privacy: 2, password: "42")
      stub_connection current_user: current_user
      subscribe(chat_id: chats.last.id, password: "42")
      expect(subscription).to be_confirmed
    end

    it "should not accept password" do
      chats.last.update!(privacy: 2, password: "nope")
      stub_connection current_user: current_user
      subscribe(chat_id: chats.last.id, password: "42")
      expect(subscription).to be_rejected
    end
  end

  describe 'Bans' do
    it "should not subscribe" do
      create(:chat_ban, user: current_user, chat: chats.first)
      stub_connection current_user: current_user
      subscribe(chat_id: chats.first.id)
      expect(subscription).to be_rejected
    end
  end
end
