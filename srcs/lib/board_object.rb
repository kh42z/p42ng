# frozen_string_literal: true

class BoardObject
  attr_accessor :updated

  HORIZONTAL_LIMIT = 512
  VERTICAL_LIMIT = 256

  def initialize
    super
    @updated = true
  end

  protected

  def within_vertical_boundary?(pos)
    pos.positive? && pos < VERTICAL_LIMIT
  end

  def within_horizontal_boundary?(pos)
    pos.positive? && pos < HORIZONTAL_LIMIT
  end
end
