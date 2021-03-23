# frozen_string_literal: true

class TwoFactorController < ApplicationController
  def show
    return render_error('missingCode', 403) unless params.key?('code')

    user = User.find(params[:id])
    # authenticate is hardcoded to use password (and Devise already use password)
    unless user.two_factor? && BCrypt::Password.new(user.two_factor_code_digest) == params['code']
      return render_error('twoFactorFailed', 401)
    end

    user.two_factor_code = SecureRandom.urlsafe_base64(nil, false)
    json_response(user.create_new_auth_token)
  end
end
