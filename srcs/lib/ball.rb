# frozen_string_literal: true

class Ball
  attr_accessor :x, :y, :up, :left

  def initialize(v_limit, h_limit)
    @v_limit = v_limit
    @h_limit = h_limit
    @x = 256
    @y = rand(v_limit / 4..v_limit / 2)
    @up = [true, false].sample
    @left = [true, false].sample
  end

  def move
    @up = !up if vertically_inside?(@y) == false

    move_h
    move_y
  end

  def score?
    horizontally_inside?(@x) == false
  end

  private

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

  def vertically_inside?(pos)
    pos.positive? && pos < @v_limit
  end

  def horizontally_inside?(pos)
    pos.positive? && pos < @h_limit
  end
end
