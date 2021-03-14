# frozen_string_literal: true

module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def render_not_allowed
    render json: {
      errors: [I18n.t('notAllowed')]
    }, status: 401
  end

  def render_error_message(arg)
    render json: { errors: [I18n.t(arg)] }, status: 403
  end

  def render_error(arg, status)
    render json: { errors: [I18n.t(arg)] }, status: status
  end
end
