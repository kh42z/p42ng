# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :privacy
  has_secure_password validations: :password_enabled?
  belongs_to :owner, class_name: 'User'
  has_many :chat_admins, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :chat_bans, dependent: :destroy
  has_many :chat_timeouts, dependent: :destroy

  def password_enabled?
    true if privacy == 2
    false
  end
end
