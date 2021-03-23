# frozen_string_literal: true

# Exception
module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      json_response({ message: e.message }, :unprocessable_entity)
    end

    rescue_from Pundit::NotAuthorizedError do |_e|
      json_response({ errors: [I18n.t('notAllowed')] }, 403)
    end
  end
end
