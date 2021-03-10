# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_id = params[:id]
    return reject if reject_user?

    stream_from "chat_#{@chat_id}"
  end

  def received(data)
    return if Rails.cache.exist?("timeout_chat_#{@chat_id}_#{current_user.id}")

    broadcast_to("chat_#{@chat_id}", data['message'])
  end

  def unsubscribed; end

  private

  def reject_user?
    return true if Rails.cache.exist?("ban_chat_#{@chat_id}_#{current_user.id}")

    ChatParticipant.where(user_id: current_user.id, chat_id: @chat_id).empty?
  end
end
