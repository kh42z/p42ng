# frozen_string_literal: true

class PongBase
  HORIZONTAL_LIMIT = 512
  VERTICAL_LIMIT = 256
  PADDLE_PADDING = 10
  PADDLE_SIZE = 10

  protected

  def within_vertical_boundary?(pos)
    pos.positive? && pos < VERTICAL_LIMIT
  end

  def within_horizontal_boundary?(pos)
    pos.positive? && pos < HORIZONTAL_LIMIT
  end
end
