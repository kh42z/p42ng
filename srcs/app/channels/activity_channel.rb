# frozen_string_literal: true

class ActivityChannel < ApplicationCable::Channel
  def subscribed
    ActionCable.server.broadcast('activity',
                                 { action: 'status_update', id: current_user.id, status: 'online' })
    stream_from 'activity'
  end

  def unsubscribed
    ActionCable.server.broadcast('activity',
                                 { action: 'status_update', id: current_user.id, status: 'offline' })
  end
end
