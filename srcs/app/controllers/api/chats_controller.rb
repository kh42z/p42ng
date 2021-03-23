# frozen_string_literal: true

module Api
  class ChatsController < ApiController
    before_action :set_chat
    skip_before_action :set_chat, only: %i[index create messages]
    after_action :verify_authorized, except: %i[index show create join leave]

    ChatReducer = Rack::Reducer.new(
      Chat.all.order(:updated_at),
      ->(participant_id:) { joins(:participants).where(chat_participants: { user_id: participant_id }) }
    )

    def index
      chats = ChatReducer.apply(params)
      json_response(chats)
    end

    def update
      authorize @chat
      @chat.update!(chat_params)
      json_response(@chat, 200)
    end

    def create
      chat = Chat.create!(chat_params)
      ChatParticipant.create!(user: current_user, chat: chat, role: 'owner')
      add_participants(chat, params[:participant_ids])
      json_response(chat, 201)
    end

    def join
      raise WrongPasswordError if @chat.privacy == 'protected' && !@chat.authenticate(params.fetch(:password))

      json_response(ChatParticipant.create!(user: current_user, chat: @chat), 201)
    end

    def leave
      ChatParticipant.where(chat: @chat, user: current_user).destroy_all
      manage_ownership if @chat.owner.nil?
      head :no_content
    end

    def kick
      authorize @chat
      target = params.fetch(:tid)
      return render_not_allowed if @chat.owner.id == target.to_i

      ChatParticipant.where(chat: @chat, user: target).destroy_all
      head :no_content
    end

    def mutes
      authorize @chat
      timeout_user_from_chat(@chat.id, params.fetch(:user_id), params.fetch(:duration))
      json_response({ user: params[:user_id].to_i, duration: params[:duration].to_i }, 201)
    end

    def bans
      authorize @chat
      ban_user_from_chat(@chat.id, params.fetch(:user_id), params.fetch(:duration))
      disconnect_banned_user(params[:user])
      json_response({ user: params[:user_id].to_i, duration: params[:duration].to_i }, 201)
    end

    def invites
      authorize @chat
      add_participants(@chat, params[:participant_ids])
      json_response(params[:participant_ids], 201)
    end

    def promote
      authorize @chat
      target = params.fetch(:tid)
      return render_not_allowed if ChatParticipant.where(chat: @chat, user_id: target, role: 'owner').empty? == false

      p = ChatParticipant.where(user_id: target, chat: @chat).first
      return render_error('notFound', 404) if p.nil?

      p.update!(role: 'admin')
      json_response({ user_id: p.id, role: p.role }, 201)
    end

    def demote
      authorize @chat
      target = params.fetch(:tid)
      return render_not_allowed if ChatParticipant.where(chat: @chat, user_id: target, role: 'owner').empty? == false

      ChatParticipant.where(chat: @chat, user: target).first&.update!(role: 'participant')
      head :no_content
    end

    def show
      json_response(@chat)
    end

    def destroy
      authorize @chat
      @chat.destroy
      head :no_content
    end

    private

    def manage_ownership
      if (admin = ChatParticipant.where(chat: @chat, role: 'admin').first)
        admin.update!(role: 'owner')
      elsif (p = ChatParticipant.where(chat: @chat).first)
        p.update!(role: 'owner')
      else
        @chat.destroy
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
