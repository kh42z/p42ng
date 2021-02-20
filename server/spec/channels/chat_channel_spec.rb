require "rails_helper"

RSpec.describe ChatChannel, type: :channel do
  let!(:chats) { create_list(:chat, 3) }
  let!(:current_user) { create(:user) }

  describe 'Participants' do
    it "should not subscribe" do
      stub_connection current_user: current_user
      subscribe(chat_id: chats.first.id)
      expect(subscription).not_to be_confirmed
    end

    it "should subscribe" do
      create(:chat_participant, user: current_user, chat: chats.first)
      stub_connection current_user: current_user
      subscribe(chat_id: chats.first.id)
      expect(subscription).to be_confirmed
    end
  end

  describe 'Bans' do
    it "should not subscribe" do
      create(:chat_participant, user: current_user, chat: chats.first)
      create(:chat_ban, user: current_user, chat: chats.first)
      stub_connection current_user: current_user
      subscribe(chat_id: chats.first.id)
      expect(subscription).not_to be_confirmed
    end
  end
end
