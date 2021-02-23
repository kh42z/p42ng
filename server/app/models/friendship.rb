# frozen_string_literal: true

class Friendship < ApplicationRecord
  belongs_to :friend_a, class_name: 'User', optional: true
  belongs_to :friend_b, class_name: 'User', optional: true
end
