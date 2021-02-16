# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :privacy
  validates_presence_of :password, optional: true
  belongs_to :owner, class_name: 'User'
  has_many :chat_admins, dependent: :destroy
end
