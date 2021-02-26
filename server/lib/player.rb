# frozen_string_literal: true

class Player
  attr_accessor :score, :position, :side, :direction

  def initialize(side)
    @score = 0
    @position = 0
    @side = side
    @direction = ''
  end

  def move
    case direction
    when 'up'
      @position += 1
    when 'down'
      @position -= 1
    end
  end
end
