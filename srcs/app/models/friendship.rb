# frozen_string_literal: true

class Friendship < ApplicationRecord
  belongs_to :friend_a, class_name: 'User'
  belongs_to :friend_b, class_name: 'User'
  validates_uniqueness_of :friend_a, scope: :friend_b
  validates_uniqueness_of :friend_b, scope: :friend_a
end
