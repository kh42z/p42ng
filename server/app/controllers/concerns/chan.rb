# frozen_string_literal: true

module Chan
  # after 2 hours wasted -> https://github.com/rails/rails/pull/35319
  def disconnect_banned_user(ban_id)
    ActionCable.server.remote_connections.where(current_user: ban_id).disconnect
  end
end
