# frozen_string_literal: true

class ChatSerializer < ActiveModel::Serializer
  attributes :id, :owner_id, :privacy, :admin_ids, :name
  attributes :participant_ids, :timeout_ids, :ban_ids

  def admin_ids
    object.chat_admins.pluck(:user_id)
  end

  def participant_ids
    object.chat_participants.pluck(:user_id)
  end

  def timeout_ids
    object.chat_timeouts.pluck(:user_id)
  end

  def ban_ids
    object.chat_bans.pluck(:user_id)
  end
end
