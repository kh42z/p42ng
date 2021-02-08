# frozen_string_literal: true

module Api
  class ChatsController < ApplicationController
    def index
      json_response(Chat.all)
    end
  end
end
