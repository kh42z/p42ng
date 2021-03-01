require "rails_helper"

RSpec.describe ChatChannel, type: :channel do
  let!(:current_user) { create(:user) }


  describe 'Participants' do
    before {
      @chat = create(:chat, privacy: 'public')
    }
    it "should subscribe" do
      create(:chat_participant, chat: @chat, user: current_user)
      stub_connection current_user: current_user
      subscribe(id: @chat.id)
      expect(subscription).to be_confirmed
    end

    it "should not subscribe" do
      stub_connection current_user: current_user
      subscribe(id: @chat.id)
      expect(subscription).to be_rejected
    end
  end

  describe 'Bans' do
    it "should not subscribe" do
      chat = create(:chat, privacy: 'public')
      create(:chat_participant, chat: chat, user: current_user)
      create(:chat_ban, user: current_user, chat: chat)
      stub_connection current_user: current_user
      subscribe(id: chat.id)
      expect(subscription).to be_rejected
    end
  end
end