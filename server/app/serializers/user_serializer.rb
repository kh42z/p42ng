# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :image_url,
             :guild_id,
             :state_id,
             :ladder_id,
             :two_factor,
             :nickname,
             :ladder_games_won,
             :ladder_games_lost,
             :uid,
             :chat_ids

  def chat_ids
    object.chats.pluck(:id)
  end
end
