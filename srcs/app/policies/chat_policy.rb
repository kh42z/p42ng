# frozen_string_literal: true

class ChatPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    super
    @user = user
    @record = record
  end

  def update?
    owner_or_superuser?
  end

  def kick?
    admin_owner_superuser?
  end

  def mutes?
    admin_owner_superuser?
  end

  def invites?
    admin_owner_superuser?
  end

  def promote?
    admin_owner_superuser?
  end

  def leave?
    true
  end

  def demote?
    admin_owner_superuser?
  end

  def destroy?
    admin_owner_superuser?
  end

  def bans?
    admin_owner_superuser?
  end

  private

  def owner_or_superuser?
    user == record.owner || user.admin == true
  end

  def admin_owner_superuser?
    owner_or_superuser? || ChatAdmin.where(user_id: user.id, chat_id: record.id).empty? == false
  end
end
