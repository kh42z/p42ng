# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :privacy
  belongs_to :owner, class_name: 'User'
  has_secure_password
end
