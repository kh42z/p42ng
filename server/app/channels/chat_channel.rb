# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_id = params[:id]
    return reject if reject_user?

    stream_from "chat_#{@chat_id}"
  end

  def received(data)
    return unless ChatTimeout.where(user_id: current_user.id, chat_id: @chat_id).count.positive?

    broadcast_to("chat_#{@chat_id}", data['message'])
  end

  def unsubscribed; end

  private

  def reject_user?
    return true if ChatBan.where(user_id: current_user.id, chat_id: @chat_id).count.positive?

    ChatParticipant.where(user_id: current_user.id, chat_id: @chat_id).empty?
  end
end
