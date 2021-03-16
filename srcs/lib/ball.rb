# frozen_string_literal: true

require 'pong_base'

class Ball < PongBase
  attr_accessor :x, :y, :up, :left

  def initialize
    super()
    @x = 256
    @y = rand(VERTICAL_LIMIT / 4..VERTICAL_LIMIT / 2)
    @up = [true, false].sample
    @left = [true, false].sample
  end

  def move(left_paddle_y, right_paddle_y)
    @up = !@up if within_vertical_boundary?(@y) == false

    @left = !@left if hit_paddle(left_paddle_y) || hit_paddle(right_paddle_y)

    move_h
    move_y
  end

  def scores?
    within_horizontal_boundary?(@x) == false
  end

  private

  def hit_paddle(paddle_y)
    return unless (@x == PADDLE_PADDING + 1 && @left) || (@x == HORIZONTAL_LIMIT - PADDLE_PADDING - 1 && @left == false)

    @y.between?(paddle_y - PADDLE_SIZE, paddle_y + PADDLE_SIZE)
  end

  def move_h
    if @up == true
      @y += 1
    else
      @y -= 1
    end
  end

  def move_y
    if @left == true
      @x -= 1
    else
      @x += 1
    end
  end
end
