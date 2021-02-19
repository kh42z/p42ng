# frozen_string_literal: true

class WarTerm < ApplicationRecord
  validates_presence_of :start
  validates_presence_of :end
  validates_inclusion_of :ladder, in: [true, false]
  validates_inclusion_of :agreed, in: [true, false]
  has_many :war_addons
  belongs_to :war
end
