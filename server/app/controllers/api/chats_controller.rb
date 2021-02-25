# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat, only: %i[show update destroy participants]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:chat_participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      json_response(chat.update(chat_params))
    end

    def create
      chat = Chat.new(chat_params)
      chat.owner = current_user
      if chat.save
        json_response(chat, :created)
      else
        json_response(chat.errors, :unprocessable_entity)
      end
    end

    def participants
      return render_error('isChatParticipantAlready') \
      if ChatParticipant.where(user_id: current_user.id, chat_id: @chat.id).any?

      return unless chat_password?

      participant = ChatParticipant.new(user_id: current_user.id, chat_id: @chat.id)
      if participant.save
        json_response(participant, :created)
      else
        json_response(participant.errors, :unprocessable_entity)
      end
    end

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def chat_password?
      return true unless @chat.privacy == 'protected'
      return false unless chat_password_given?

      chat_password_correct?
    end

    def chat_password_given?
      if params.key?(:password)
        true
      else
        render_error('passwordRequired')
        false
      end
    end

    def chat_password_correct?
      if BCrypt::Password.new(@chat.password_digest) == params[:password]
        true
      else
        render_error('passwordIncorrect')
        false
      end
    end

    def chat_params
      params.permit(:privacy, :password)
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end
  end
end
