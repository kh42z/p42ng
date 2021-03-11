# frozen_string_literal: true

class TwoFactorResetJob < ApplicationJob
  queue_as :default

  def perform(user)
    user.update!(two_factor_code: SecureRandom.urlsafe_base64(nil, false))
  end
end
