# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :player_left, class_name: 'User'
  belongs_to :player_right, class_name: 'User'
  belongs_to :winner, class_name: 'User', optional: true
  validates_presence_of :connected_players
  validates_inclusion_of :mode, in: %w[duel ladder tournament]
  validates_inclusion_of :status, in: %w[pending inprogress played]
end
