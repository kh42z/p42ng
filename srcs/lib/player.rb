# frozen_string_literal: true

class Player
  attr_accessor :score, :side, :updated

  def initialize(side)
    @score = 0
    @position = 0
    @side = side
    @updated = false
  end

  def move(position)
    @position = position
    @updated = true
  end

  def read_position
    @updated = false
    @position
  end
end
