# frozen_string_literal: true

module Api
  class ChatsController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_chat, only: %i[show update destroy]

    def index
      json_response(Chat.all.order(:updated_at))
    end

    def update
      json_response(chat.update(user_params))
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

    def show
      json_response(@chat)
    end

    def destroy
      @chat.destroy
      head :no_content
    end

    private

    def chat_params
      params.permit(:privacy, :password)
    end

    def set_chat
      @chat = Chat.find(params[:id])
    end
  end
end
