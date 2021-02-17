# frozen_string_literal: true

class ChatTimeout < ApplicationRecord
  validates_presence_of :user
  validates_presence_of :chat
  validates_presence_of :timeout
  belongs_to :chat
  belongs_to :user
end
