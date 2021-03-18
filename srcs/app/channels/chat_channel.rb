# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_id = params[:id]
    return reject if reject_user?

    stream_from "chat_#{@chat_id}"
  end

  def received(data)
    return if user_timeout_from_chat?(@chat_id, current_user.id)

    ActionCable.server.broadcast("chat_#{@chat_id}",
                                 { action: 'message', sender_id: current_user.id, content: data.fetch('message'),
                                   created_at: Time.now.strftime('%Y-%m-%d %H:%M:%S') })
  end

  def unsubscribed; end

  private

  def reject_user?
    return true if user_banned_from_chat?(@chat_id, current_user.id)

    ChatParticipant.where(user_id: current_user.id, chat_id: @chat_id).empty?
  end
end
