# frozen_string_literal: true

class ChatSerializer < ActiveModel::Serializer
  attributes :id,
             :owner_id,
             :privacy,
             :admin_ids,
             :name,
             :participant_ids,
             :timeout_ids,
             :ban_ids

  def admin_ids
    object.chat_admins.pluck(:user_id)
  end

  def participant_ids
    object.chat_participants.pluck(:user_id)
  end

  def timeout_ids
    arr = []
    object.chat_participants.each do |e|
      arr << e if Rails.cache.exist?("timeout_chat_#{object.id}_#{e}")
    end
    arr
  end

  def ban_ids
    arr = []
    object.chat_participants.each do |e|
      arr << e if Rails.cache.exist?("ban_chat_#{object.id}_#{e}")
    end
    arr
  end
end
