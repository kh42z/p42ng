# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatChannel, type: :channel do
  include_context 'with cache'
  let!(:current_user) { create(:user) }

  describe 'Participants' do
    before do
      @chat = create(:chat, privacy: 'public')
    end
    it 'should subscribe' do
      create(:chat_participant, chat: @chat, user: current_user)
      stub_connection current_user: current_user
      subscribe(id: @chat.id)
      expect(subscription).to be_confirmed
    end

    it 'should not subscribe' do
      stub_connection current_user: current_user
      subscribe(id: @chat.id)
      expect(subscription).to be_rejected
    end

    it 'should broadcast' do
      create(:chat_participant, chat: @chat, user: current_user)
      stub_connection current_user: current_user
      subscribe(id: @chat.id)
      expect do
        perform :received,
                message: 'toto'
      end.to have_broadcasted_to("chat_#{@chat.id}").with(action: 'message', sender_id: current_user.id,
                                                          content: 'toto', created_at: Time.now.strftime('%Y-%m-%d %H:%M:%S'))
    end
  end

  describe 'Bans' do
    it 'should not subscribe' do
      chat = create(:chat, privacy: 'public')
      create(:chat_participant, chat: chat, user: current_user)
      Rails.cache.write("ban_chat_#{chat.id}_#{current_user.id}", 0,
                        expires_in: 5.seconds)
      stub_connection current_user: current_user
      subscribe(id: chat.id)
      expect(subscription).to be_rejected
    end
  end
end
