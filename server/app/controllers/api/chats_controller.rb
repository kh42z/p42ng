# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat, only: %i[show destroy participants chat_password_correct mutes bans]

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
      chat.save
      json_response(chat, 201)
      # create ChatAdmin.user_id = current_user.id
      # ChatAdmin.chat_id = chat.id
      # create ChatParticipants if provided
    end

    def participants
      raise WrongPasswordError if @chat.privacy == 'protected' && !@chat.authenticate(params.fetch(:password))

      participant = ChatParticipant.create!(user_id: current_user.id, chat_id: @chat.id)
      json_response(participant, 200)
    end

    def mutes
      destroy_job(ChatTimeout.create!(user_id: params.fetch(:user_id), chat_id: @chat.id))
    end

    def bans
      destroy_job(ChatBan.create!(user_id: params.fetch(:user_id), chat_id: @chat.id))
    end

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def destroy_job(object)
      timer = params.fetch(:duration).to_i
      DestroyObjectJob.set(wait: timer.seconds).perform_later(object)
      json_response(object, 200)
    end

    def chat_params
      params.permit(:privacy, :password)
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end
  end
end
