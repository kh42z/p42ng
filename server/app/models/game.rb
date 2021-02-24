# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :player_left, class_name: 'User'
  belongs_to :player_right, class_name: 'User'
  belongs_to :winner, class_name: 'User', optional: true
  validates_inclusion_of :started, in: [true, false]
  validates_inclusion_of :game_type, in: %w[duel ladder tournament]
end
