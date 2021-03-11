# frozen_string_literal: true

class Achievement < ApplicationRecord
  validates_presence_of :name
  validates :name, uniqueness: true
  validates_presence_of :description
  has_many :user_achievements, dependent: :destroy
end
