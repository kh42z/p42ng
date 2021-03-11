# frozen_string_literal: true

class ChatMessage < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :chat
  validates_presence_of :content
  validates :content, length: { maximum: 300 }, allow_nil: false
end
