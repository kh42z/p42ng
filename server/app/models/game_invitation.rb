# frozen_string_literal: true

class GameInvitation < ApplicationRecord
  belongs_to :player1, class_name: 'User'
  belongs_to :player2, class_name: 'User'
  belongs_to :game_type
  validates_presence_of :from
end
