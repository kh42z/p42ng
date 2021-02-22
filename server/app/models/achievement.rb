# frozen_string_literal: true

class Achievement < ApplicationRecord
  validates_presence_of :name
  validates :name, uniqueness: true
  validates_presence_of :description
  belongs_to :user_achievement
end
