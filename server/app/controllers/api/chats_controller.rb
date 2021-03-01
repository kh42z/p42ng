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
      add_admins(@chat) if params[:admin_ids] && params[:admins_ids] != 0
      add_participants(@chat) if params[:participant_ids] && params[:participant_ids] != 0
      @chat.update!(chat_params_update)
      json_response(@chat)
    end

    def create
      chat = Chat.create!(chat_params_create)
      add_admins(chat) if params[:admin_ids] && params[:admins_ids] != 0
      add_participants(chat) if params[:participant_ids] && params[:participant_ids] != 0
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
    end

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def add_admins(chat)
      params[:admin_ids].each { |t| ChatAdmin.create!(user_id: t, chat_id: chat.id) }
    end

    def add_participants(chat)
      params[:participant_ids].each { |t| ChatParticipant.create!(user_id: t, chat_id: chat.id) }
    end

    def destroy_job(object)
      timer = params.fetch(:duration).to_i
      DestroyObjectJob.set(wait: timer.seconds).perform_later(object)
      json_response(object, 200)
    end

    def chat_params_update
      params.permit(:privacy, :password, :name)
    end

    def chat_params_create
      filtered_params = params.permit(:privacy, :password, :name)
      owner_and_name = { owner: current_user, name: "#{current_user.nickname}'s chat" }
      filtered_params.merge!(owner_and_name)
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end
  end
end
