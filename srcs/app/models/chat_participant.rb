# frozen_string_literal: true

class ChatParticipant < ApplicationRecord
  validates_presence_of :user
  validates_uniqueness_of :user_id, scope: :chat
  validates_presence_of :chat
  enum role: %i[participant admin owner]
  validates_uniqueness_of :role, scope: :chat, if: :role_owner
  belongs_to :chat
  belongs_to :user

  def role_owner
    role == 'owner'
  end
end
