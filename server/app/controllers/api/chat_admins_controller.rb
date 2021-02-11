# frozen_string_literal: true

module Api
  class ChatAdminsController < ApplicationController
    def index
      json_response(ChatAdmin.where(chat_id: params[:chat_id]))
    end
  end
end
