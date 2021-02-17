# frozen_string_literal: true

class ChatBan < ApplicationRecord
  validates_presence_of :user
  validates_presence_of :chat
  belongs_to :chat
  belongs_to :user
end
