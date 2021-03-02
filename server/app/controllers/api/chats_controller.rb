# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat,
                  only: %i[update show destroy create_participant chat_password_correct mutes bans destroy_participant]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:chat_participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      add_admins(@chat, params[:admin_ids]) if params[:admin_ids]
      @chat.update!(chat_params)
      json_response(@chat)
    end

    def create
      chat = Chat.create!(chat_params_create)
      add_admins(chat, [current_user.id])
      add_participants(chat, [current_user.id])
      add_participants(chat, params[:participant_ids]) if params[:participant_ids]
      json_response(chat, 201)
    end

    def create_participant
      raise WrongPasswordError if @chat.privacy == 'protected' && !@chat.authenticate(params.fetch(:password))

      participant = ChatParticipant.create!(user_id: current_user.id, chat_id: @chat.id)
      json_response(participant, 200)
    end

    def destroy_participant
      ChatParticipant.where(chat: @chat).destroy_by(user: current_user)
      ChatAdmin.where(chat: @chat).destroy_by(user: current_user)
      head :no_content
    end

    def mutes
      destroy_job(ChatTimeout.create!(user_id: params.fetch(:user_id), chat_id: @chat.id))
    end

    def bans
      destroy_job(ChatBan.create!(user_id: params.fetch(:user_id), chat_id: @chat.id))
      disconnect_banned_user(params.fetch(:user_id))
    end

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def add_admins(chat, admins)
      admins.each { |t| ChatAdmin.create!(user_id: t, chat_id: chat.id) }
    end

    def add_participants(chat, participants)
      participants.each { |t| ChatParticipant.create!(user_id: t, chat_id: chat.id) }
    end

    def destroy_job(object)
      timer = params.fetch(:duration).to_i
      DestroyObjectJob.set(wait: timer.seconds).perform_later(object)
      json_response(object, 200)
    end

    def chat_params
      params.permit(:privacy, :password, :name)
    end

    def chat_params_create
      filtered_params = params.permit(:privacy, :password, :name)
      filtered_params.merge!({ owner: current_user })
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end

    # after 2 hours wasted -> https://github.com/rails/rails/pull/35319
    def disconnect_banned_user(ban_id)
      ActionCable.server.remote_connections.where(current_user: ban_id).disconnect
    end
  end
end
