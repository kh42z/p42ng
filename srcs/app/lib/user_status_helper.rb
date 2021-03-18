# frozen_string_literal: true

module UserStatusHelper
  ACTIVITY_CHANNEL = 'activity'

  def update_user_status(user, status)
    user.update!(status: status)
    ActionCable.server.broadcast(ACTIVITY_CHANNEL,
                                 { action: 'user_update_status', id: user.id, status: status })
  end
end
