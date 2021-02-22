# frozen_string_literal: true

class GameRecordSerializer < ActiveModel::Serializer
  attributes :id, :winner_id, :looser_id, :game_type_id, :created_at
end
