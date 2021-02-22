# frozen_string_literal: true

class UserAchievement < ApplicationRecord
  has_many :achievements
  belongs_to :user
end
