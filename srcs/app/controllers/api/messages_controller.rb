# frozen_string_literal: true

module Api
  class MessagesController < ApiController
    before_action :authorize

    def create
      return render_not_allowed unless send_forbidden? == false

      content = message_params.fetch('content')
      raise MessageTooLongError if content.length > 300

      message = ChatMessage.create!(content: content, sender_id: current_user.id, chat_id: @chat_id)
      ActionCable.server.broadcast("chat_#{@chat_id}",
                                   { sender_id: current_user.id, content: content,
                                     created_at: message.created_at.to_s })
      json_response(message, 201)
    end

    def index
      json_response(ChatMessage.where(chat_id: @chat_id).order(id: :asc).last(10))
    end

    private

    def set_chat_id
      @chat_id = params['chat_id']
    end

    def send_forbidden?
      chat_timeout?(@chat_id, current_user.id)
    end

    def message_params
      params.permit(:content)
    end

    def reject_user?
      return true if Rails.cache.exist?("ban_chat_#{@chat_id}_#{current_user.id}")

      ChatParticipant.where(user_id: current_user.id, chat_id: @chat_id).empty?
    end

    def authorize
      set_chat_id
      render_not_allowed if reject_user?
    end
  end
end
