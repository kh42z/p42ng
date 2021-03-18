# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :player_left, class_name: 'User'
  belongs_to :player_right, class_name: 'User'
  belongs_to :winner, class_name: 'User', optional: true
  validates_presence_of :connected_players
  validates_inclusion_of :mode, in: %w[duel ladder tournament]
  validates_inclusion_of :status, in: %w[pending inprogress played]
  validates_uniqueness_of :player_left, conditions: -> { where.not(status: 'played') }
  validates_uniqueness_of :player_right, conditions: -> { where.not(status: 'played') }
  validate :player_right_uniqueness
  validate :player_left_uniqueness

  private

  def player_right_uniqueness
    return if Game.where(player_right: player_left).where.not(status: 'played').empty?

    errors.add(:player_right,
               'is already in game')
  end

  def player_left_uniqueness
    return if Game.where(player_left: player_right).where.not(status: 'played').empty?

    errors.add(:player_left,
               'is already in game')
  end
end
