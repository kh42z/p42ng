# frozen_string_literal: true

class ChatAdmin < ApplicationRecord
  validates_presence_of :user
  validates_uniqueness_of :user_id, scope: :chat
  validates_presence_of :chat
  belongs_to :chat
  belongs_to :user
end
