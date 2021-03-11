# frozen_string_literal: true

class WarTime < ApplicationRecord
  validates_presence_of :start
  validates_presence_of :end
  belongs_to :war
end
