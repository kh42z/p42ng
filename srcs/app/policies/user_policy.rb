# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user

  def initialize(user, record)
    super
    @user = user
    @record = record
  end

  def update?
    allowed?
  end

  def upload_avatar?
    allowed?
  end

  def create_ignore?
    allowed?
  end

  def destroy_ignore?
    allowed?
  end

  def create_friendship?
    allowed?
  end

  def destroy_friendship?
    allowed?
  end

  def permitted_attributes
    if user.admin?
      %i[two_factor nickname first_login banned]
    else
      %i[two_factor nickname first_login]
    end
  end

  private

  def allowed?
    record.id == user.id || user.admin?
  end
end
