# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat
    before_action :permission, only: %i[update invite create_admins destory_admins destroy]
    skip_before_action :set_chat, only: %i[index create messages]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      @chat.update!(chat_params)
      head :ok
    end

    def create
      chat = Chat.create!(chat_params.merge!({ owner: current_user }))
      ChatAdmin.create!(user: current_user, chat: chat)
      add_participants(chat, [current_user.id])
      add_participants(chat, params[:participant_ids])
      json_response(chat, 201)
    end

    def create_participant
      raise WrongPasswordError if @chat.privacy == 'protected' && !@chat.authenticate(params.fetch(:password))

      ChatParticipant.create!(user: current_user, chat: @chat)
      head :ok
    end

    def destroy_participant
      ChatParticipant.where(chat: @chat, user: current_user).destroy_all
      ChatAdmin.where(chat: @chat, user: current_user).destroy_all
      manage_admin if current_user == @chat.owner
      head :no_content
    end

    def mutes
      timeout_user_from_chat(@chat.id, params.fetch(:user_id), params.fetch(:duration))
      head :no_content
    end

    def bans
      ban_user_from_chat(@chat.id, params.fetch(:user_id), params.fetch(:duration))
      disconnect_banned_user(params.fetch(:user_id))
      head :no_content
    end

    def invites
      add_participants(@chat, params[:participant_ids])
      head :ok
    end

    def create_admins
      ChatAdmin.create!(user_id: params.fetch(:tid), chat: @chat)
      head :ok
    end

    def destroy_admins
      ChatAdmin.where(chat: @chat, user: params.fetch(:tid)).destroy_all
      head :no_content
    end

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def permission
      render_not_allowed unless current_user == @chat.owner || current_user.admin == true
    end

    def manage_admin
      if ChatAdmin.first
        @chat.update!(owner: ChatAdmin.first.user)
      elsif ChatParticipant.first
        @chat.update!(owner: ChatParticipant.first.user)
        ChatAdmin.create!(user_id: @chat.owner_id, chat_id: @chat.id)
      else
        destroy
      end
    end

    def add_participants(chat, participants)
      return unless participants

      participants.each do |t|
        ChatParticipant.create(user_id: t, chat_id: chat.id)
        ActionCable.server.broadcast("user_#{t}", { action: 'chat_invitation', id: chat.id })
      end
    end

    def chat_params
      params.permit(:privacy, :password, :name)
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end
  end
end
