# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :winner, class_name: 'User', optional: true
  belongs_to :looser, class_name: 'User', optional: true
  belongs_to :game_type
end
