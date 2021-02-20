# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat = Chat.find(params[:room_id])
    stream_for @chat
  end

  def received(data)
    broadcast_to(@chat, data['message'])
  end

  def unsubscribed; end
end
