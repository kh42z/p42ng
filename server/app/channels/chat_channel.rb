# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat = Chat.find(params[:chat_id])

    return reject if reject_user?

    stream_for @chat if ChatParticipant.create(chat_id: @chat.id, user_id: current_user.id)
  end

  def received(data)
    broadcast_to(@chat, data['message'])
  end

  def unsubscribed
    ChatParticipant.where(user_id: current_user.id, chat_id: params[:chat_id]).destroy_all
  end

  private

  def reject_user?
    return true if ChatBan.where(user_id: current_user.id, chat_id: params[:chat_id]).count.positive?
    return true if @chat.privacy == 2 && @chat.authenticate(params[:password]) == false

    false
  end
end
