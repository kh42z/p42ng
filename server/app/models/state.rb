# frozen_string_literal: true

class State < ApplicationRecord
  validates_presence_of :name
end
