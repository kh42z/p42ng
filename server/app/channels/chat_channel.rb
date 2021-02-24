# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat = Chat.find(params[:chat_id])

    return reject if reject_user?

    stream_for @chat
  end

  def received(data)
    broadcast_to(@chat, data['message'])
  end

  def unsubscribed; end

  private

  def reject_user?
    return true if ChatBan.where(user_id: current_user.id, chat_id: params[:chat_id]).count.positive?

    ChatParticipant.where(user_id: current_user.id, chat_id: params[:chat_id]).empty?
  end
end
