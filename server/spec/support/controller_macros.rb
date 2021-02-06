# frozen_string_literal: true
#
#
module ControllersMacro
  def sign_in_as_a_valid_user
    @user ||= FactoryBot.create :user
    get '/auth/sign_in'
    sign_in @user
    post user_session_url
    assert_response :success
  end
end
