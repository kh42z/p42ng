# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :privacy
  validates_presence_of :password
  belongs_to :owner, class_name: 'User'
end
