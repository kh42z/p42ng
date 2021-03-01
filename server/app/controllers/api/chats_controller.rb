# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat, only: %i[update show destroy participants chat_password_correct mutes bans]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:chat_participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      update_admins(@chat, params[:admin_ids]) unless params[:admin_ids].nil?
      update_participants(@chat, params[:participant_ids]) unless params[:participant_ids].nil?
      @chat.update!(chat_params)
      json_response(@chat)
    end

    def create
      chat = Chat.create!(chat_params_create)
      update_admins(chat, [current_user.id])
      update_participants(chat, params[:participant_ids]) unless params[:participant_ids].nil?
      json_response(chat, 201)
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

    def update_admins(chat, admins)
      ChatAdmin.where(chat_id: chat.id).destroy_all
      admins.each { |t| ChatAdmin.create!(user_id: t, chat_id: chat.id) }
    end

    def update_participants(chat, participants)
      ChatParticipant.where(chat_id: chat.id).destroy_all
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
