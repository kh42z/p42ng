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
             :chat_ids,
             :ignores,
             :friends

  def ignores
    ActiveModelSerializers::SerializableResource.new(object.ignores, each_serializer: IgnoreUserSerializer)
  end

  def guild_id
    object.guild_member[:guild_id] if object.guild_member
  end

  def friends
    arr = []
    object.friendships.each do |e|
      arr.push(if e.friend_a_id == object.id
                 { friend_id: e.friend_b_id }
               else
                 { friend_id: e.friend_a_id }
               end)
    end
    arr
  end
end
