# frozen_string_literal: true

require 'pong_base'

class Player < PongBase
  attr_accessor :score, :side, :updated
  attr_reader :user_id, :position

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

    @position = position
    @updated = true
  end

  def read_position
    @updated = false
    @position
  end
end
