# frozen_string_literal: true

class UserChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:id])

    return reject if reject_user?

    @user.update!(status: 'online')
    stream_from "user_#{@user.id}"
  end

  def unsubscribed
    @user.update!(status: 'offline')
  end

  private

  def reject_user?
    return true if @user.id != current_user.id

    false
  end
end
