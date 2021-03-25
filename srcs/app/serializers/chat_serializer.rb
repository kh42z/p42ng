# frozen_string_literal: true

class ChatSerializer < ActiveModel::Serializer
  include(CacheHelper)
  attributes :id,
             :owner_id,
             :privacy,
             :admin_ids,
             :name,
             :participant_ids,
             :timeout_ids,
             :ban_ids

  def admin_ids
    object.admins.pluck(:user_id)
  end

  def participant_ids
    object.participants.pluck(:user_id)
  end

  # https://stackoverflow.com/questions/13485468/how-to-map-and-remove-nil-values-in-ruby
  # https://stackoverflow.com/questions/44003201/ruby-passing-key-as-an-argument-to-map-instead-of-a-block
  def timeout_ids
    object.participants.select { |e| user_timeout_from_chat?(object.id, e.user.id) }.map(&:user_id)
  end

  def ban_ids
    object.participants.select { |e| user_banned_from_chat?(object.id, e.user.id) }.map(&:user_id)
  end

  def owner_id
    object.owner&.id
  end
end
