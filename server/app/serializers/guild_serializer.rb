# frozen_string_literal: true

class GuildSerializer < ActiveModel::Serializer
  attributes :id, :name, :anagram, :owner_id, :officer_ids

  def officer_ids
    object.guild_officers.pluck(:user_id)
  end
end
