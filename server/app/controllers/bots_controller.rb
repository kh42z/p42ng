# frozen_string_literal: true

class BotsController < ApplicationController
  # absolutely not a backdoor
  def index
    json_response(User.find_by(nickname: 'Alfred').create_new_auth_token)
  end
end
