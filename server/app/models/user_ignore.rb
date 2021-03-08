# frozen_string_literal: true

class UserIgnore < ApplicationRecord
  validates_presence_of :user
  validates_presence_of :ignored
  validates_uniqueness_of :ignored_id, scope: :user
  belongs_to :user
  belongs_to :ignored, class_name: 'User'
end
