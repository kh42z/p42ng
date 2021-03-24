# frozen_string_literal: true

class Chat < ApplicationRecord
  validates_presence_of :name, if: :name_required?
  validates_uniqueness_of :name, if: :name_required?
  validates_presence_of :privacy
  validates_inclusion_of :privacy, in: %w[public private protected direct_message]
  has_secure_password validations: false
  validates_presence_of :password, if: :password_enabled?
  validates_confirmation_of :password, if: :password_enabled?
  has_many :participants, class_name: 'ChatParticipant', dependent: :destroy
  has_many :admins, -> { where(role: 'admin') }, class_name: 'ChatParticipant'
  has_one :chat_owner, -> { where(role: 'owner') }, class_name: 'ChatParticipant'
  has_one :owner, through: :chat_owner, source: :user
  has_many :messages, class_name: 'ChatMessage', dependent: :destroy

  def password_enabled?
    privacy == 'protected'
  end

  def name_required?
    privacy != 'direct_message'
  end
end
