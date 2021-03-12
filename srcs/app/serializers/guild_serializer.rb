# frozen_string_literal: true

class GuildSerializer < ActiveModel::Serializer
  attributes :id, :name, :anagram, :owner_id, :officer_ids, :member_ids

  def officer_ids
    object.officers.pluck(:user_id)
  end

  def member_ids
    object.members.pluck(:user_id)
  end

  def owner_id
    object.members.owner.pluck(:user_id)
  end
end
