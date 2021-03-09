# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat
    skip_before_action :set_chat, only: %i[index create messages]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:chat_participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      return render_not_allowed if @chat.owner != current_user

      @chat.update!(chat_params)
      head :ok
    end

    def create
      chat = Chat.create!(chat_params_create)
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

    def messages
      # not using set_chat to avoid select
      id = params['id']

      return render_not_allowed unless send_forbidden?(id) == false

      ActionCable.server.broadcast("chat_#{id}", params['content'])
      # ChatChannel.broadcast_to("chat_#{id}", params['content'])
      json_response(content: params['content'])
    end

    def mutes
      Rails.cache.write("timeout_chat_#{@chat.id}_#{params.fetch(:user_id)}", 0,
                        expires_in: params.fetch(:duration).to_i.seconds)
      head :no_content
    end

    def bans
      Rails.cache.write("ban_chat_#{@chat.id}_#{params.fetch(:user_id)}", 0,
                        expires_in: params.fetch(:duration).to_i.seconds)
      disconnect_banned_user(params.fetch(:user_id))
      head :no_content
    end

    def invites
      return render_not_allowed if current_user != @chat.owner

      add_participants(@chat, params[:participant_ids])
      head :ok
    end

    def admins
      return unless current_user == @chat.owner

      tid = params.fetch(:tid)
      json_response(ChatAdmin.create!(user_id: tid, chat: @chat)) if request.post?
      json_response(ChatAdmin.where(chat: @chat, user: tid).destroy_all, 204) if request.delete?
    end

    def show
      json_response(@chat)
    end

    def destroy
      return render_not_allowed unless current_user == @chat.owner || current_user.admin == true

      @chat.destroy
      head :no_content
    end

    private

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

      participants.each { |t| ChatParticipant.create(user_id: t, chat_id: chat.id) }
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

    def send_forbidden?(id)
      return true if Rails.cache.exist?("timeout_chat_#{id}_#{current_user.id}")

      Rails.cache.exist?("ban_chat_#{id}_#{current_user.id}")
    end
  end
end
