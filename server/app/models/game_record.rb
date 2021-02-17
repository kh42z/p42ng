# frozen_string_literal: true

class GameRecord < ApplicationRecord
  belongs_to :winner, class_name: 'User'
  belongs_to :looser, class_name: 'User'
end
