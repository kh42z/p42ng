# frozen_string_literal: true

class ChatMessagesRotateJob < ApplicationJob
  queue_as :default

  def perform
    Chat.select do |e|
      chat_messages = ChatMessage.where(chat: e)
      next if chat_messages.empty?

      last_messages = chat_messages.order(created_at: :desc).limit(10)

      ChatMessage.where(chat: e).where('created_at < ?', last_messages.last.created_at).destroy_all
    end
  end
end
