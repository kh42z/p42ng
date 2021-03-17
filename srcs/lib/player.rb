# frozen_string_literal: true

require 'board_object'

class Player < BoardObject
  attr_accessor :score, :side, :updated
  attr_reader :user_id, :position

  PADDLE_PADDING = 10
  PADDLE_SIZE = 10

  def initialize(side, user_id)
    super()
    @user_id = user_id
    @score = 0
    @position = 0
    @side = side
    @updated = false
  end

  def move(position)
    return unless within_vertical_boundary?(position)

    return if position == @position

    @position = position
    @updated = true
  end
end
