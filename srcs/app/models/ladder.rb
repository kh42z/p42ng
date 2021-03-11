# frozen_string_literal: true

class Ladder < ApplicationRecord
  validates_presence_of :name
  validates :name, uniqueness: true
end
