class Ladder < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :mmr_threshold
  validates :name, uniqueness: true
end
