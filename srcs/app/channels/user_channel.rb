# frozen_string_literal: true

class UserChannel < ApplicationCable::Channel
  include(UserStatusHelper)

  def subscribed
    @user = User.find(params[:id])

    return reject if reject_user?

    update_user_status(@user, 'online')
    stream_from "user_#{@user.id}"
  end

  def unsubscribed
    update_user_status(@user, 'offline')
    # stop_stream_from("user_#{@user.id}")
  end

  private

  def reject_user?
    @user.id != current_user.id
  end
end
