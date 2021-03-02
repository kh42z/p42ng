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
    stop_all_streams
  end

  private

  def reject_user?
    return true if @user.id != current_user.id

    false
  end

  # Cette syntaxe a le meme effet :)
  #  def reject_user?
  #    @user.id != current_user.id
  #  end
end
