# frozen_string_literal: true

class TwoFactorMailer < ApplicationMailer
  def reset_email
    @user = params[:user]
    @code = params[:code]
    mail(to: @user.email, subject: 'Pong: Your code!')
  end
end
