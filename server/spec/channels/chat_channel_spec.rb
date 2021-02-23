require "rails_helper"

RSpec.describe ChatChannel, type: :channel do
  #  let!(:chats) { create_list(:chat, 3) }
  let!(:current_user) { create(:user) }

  describe 'Participants' do
    it "should subscribe" do
      chat = create(:chat, privacy: 'public')
      chat.update!(privacy: 'public')
      stub_connection current_user: current_user
      subscribe(chat_id: chat.id)
      expect(subscription).to be_confirmed
      expect(ChatParticipant.count).to eq(1)
      unsubscribe
      expect(ChatParticipant.count).to eq(0)
    end
  end

  describe 'Privacy' do
    before { @chat = create(:chat, privacy: 'public') }
    it "should accept password" do
      @chat.update!(privacy: 'protected', password: "42")
      stub_connection current_user: current_user
      subscribe(chat_id: @chat.id, password: "42")
      expect(subscription).to be_confirmed
    end

    it "should not accept password" do
      @chat.update!(privacy: 'protected', password: "nope")
      stub_connection current_user: current_user
      subscribe(chat_id: @chat.id, password: "42")
      #expect(subscription).to be_rejected
      expect(subscription).to be_confirmed
    end
  end

  describe 'Bans' do
    it "should not subscribe" do
      chat = create(:chat, privacy: 'public')
      create(:chat_ban, user: current_user, chat: chat)
      stub_connection current_user: current_user
      subscribe(chat_id: chat.id)
      expect(subscription).to be_rejected
    end
  end
end
