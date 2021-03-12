# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :name, if: :name_required?
  validates_uniqueness_of :name, if: :name_required?
  validates_presence_of :privacy
  validates_inclusion_of :privacy, in: %w[public private protected direct_message]
  has_secure_password validations: false
  validates_presence_of :password, if: :password_enabled?
  validates_confirmation_of :password, if: :password_enabled?
  belongs_to :owner, class_name: 'User'
  has_many :chat_admins, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :chat_messages, dependent: :destroy

  def password_enabled?
    privacy == 'protected'
  end

  def name_required?
    privacy != 'direct_message'
  end
end