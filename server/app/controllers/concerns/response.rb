# frozen_string_literal: true

module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def render_not_allowed
    render json: {
      errors: [I18n.t('notAllowed')]
    }, status: 403
  end

  def render_error(arg)
    render json: { errors: [I18n.t(arg)] }, status: 403
  end
end
