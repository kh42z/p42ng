# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :image_url,
             :status,
             :ladder_id,
             :guild_id,
             :two_factor,
             :nickname,
             :ladder_games_won,
             :ladder_games_lost,
             :uid,
             :admin,
             :banned,
             :first_login,
             :ignores,
             :friends

  def image_url
    return '/images/profile-pic.jpg' unless object.avatar.attached?

    Rails.application.routes.url_helpers.rails_blob_url(object.avatar, only_path: true)
  end

  def ignores
    ActiveModelSerializers::SerializableResource.new(object.ignores, each_serializer: IgnoreUserSerializer)
  end

  def guild_id
    object.guild_member[:guild_id] if object.guild_member
  end

  def friends
    ActiveModelSerializers::SerializableResource.new(object.friendship, each_serializer: FriendSerializer)
  end
end
