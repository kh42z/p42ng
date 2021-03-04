# frozen_string_literal: true

class UserIgnore < ApplicationRecord
  validates_presence_of :user
  validates_presence_of :user_ignored
  validates_uniqueness_of :user_ignored_id, scope: :user
  belongs_to :user
  belongs_to :user_ignored, class_name: 'User'
end
