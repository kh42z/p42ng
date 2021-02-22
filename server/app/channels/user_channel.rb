# frozen_string_literal: true

class UserChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:user_id])

    return reject if reject_user?

    @user.update!(state_id: 2)
    stream_for @user
  end

  def unsubscribed
    @user.update!(state_id: 1)
  end

  private

  def reject_user?
    return true if @user.id != current_user.id

    false
  end
end
