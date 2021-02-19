# frozen_string_literal: true

class ChatsChannel < ApplicationCable::Channel
  def subscribed
    @chat = Chat.find_by(id: params[:id])
    stream_for @chat
  end

  def received(_data)
    ChatsChannel.broadcast_to(@chat, { chat: @chat, users:
      @chat.waiting_users })
  end

  def unsubscribed; end
end
