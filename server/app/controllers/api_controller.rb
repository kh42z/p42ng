# frozen_string_literal: true

class ApiController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_user!
  rescue_from ActionController::ParameterMissing, with: :response_error

  class WrongPasswordError < StandardError
    def message
      I18n.t('passwordIncorrect')
    end
  end
  rescue_from WrongPasswordError, with: :response_error

  class HasGuildAlreadyError < StandardError
    def message
      I18n.t('hasGuildAlready')
    end
  end
  rescue_from HasGuildAlreadyError, with: :response_error

  private

  def response_error(error)
    json_response({ error: error.message }, 422)
  end
end
