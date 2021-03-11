# frozen_string_literal: true

class WarAddon < ApplicationRecord
  validates_presence_of :name
  belongs_to :war_term
end
