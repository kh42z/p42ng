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

  def move(paddle_left, paddle_right)
    @up = !@up if within_vertical_boundary?(@y) == false

    change_horizontal_direction(paddle_left, paddle_right)
    move_h
    move_y
  end

  def scores?
    within_horizontal_boundary?(@x) == false
  end

  private

  def change_horizontal_direction(paddle_left, paddle_right)
    if @left
      @left = false if hit_paddle(paddle_left)
    elsif hit_paddle(paddle_right)
      @left = true
    end
  end

  def hit_paddle(paddle_y)
    return unless @x == PADDLE_PADDING + 1 || @x == HORIZONTAL_LIMIT - PADDLE_PADDING - 1

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
