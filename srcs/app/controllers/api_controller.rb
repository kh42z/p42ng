# frozen_string_literal: true

class ApiController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit
  before_action :authenticate_user!
  rescue_from ActionController::ParameterMissing, with: :response_error

  class WrongPasswordError < StandardError
    def message
      I18n.t('passwordIncorrect')
    end
  end
  rescue_from WrongPasswordError, with: :response_error

  class MessageTooLongError < StandardError
    def message
      I18n.t('messageTooLong')
    end
  end
  rescue_from MessageTooLongError, with: :response_error

  private

  def response_error(error)
    json_response({ error: error.message }, 422)
  end

  def pundit_user
    current_user
  end
end
