# frozen_string_literal: true

class GameSerializer < ActiveModel::Serializer
  attributes :id, :winner_id, :player_left_id, :player_right_id, :game_type, :created_at
end
