# frozen_string_literal: true

class GuildPolicy < ApplicationPolicy
  include(CacheHelper)
  attr_reader :user, :record

  def initialize(user, record)
    super
    @user = user
    @record = record
  end

  def update?
    GuildMember.where(user_id: user.id, guild_id: record.id, rank: 'owner').empty? == false || user.admin == true
  end

  def create_members?
    allowed?
  end

  def destroy_members?
    allowed?
  end

  def create_officers?
    allowed?
  end

  def destroy_officers?
    allowed?
  end

  def accept_invites?
    guild_pending_invitation?(record.id, user.id)
  end

  def refuse_invitation?
    guild_pending_invitation?(record.id, user.id)
  end

  def create_invitation?
    allowed?
  end

  private

  def allowed?
    GuildMember.where(user_id: user.id,
                      guild_id: record.id).where.not(rank: 'member').empty? == false || user.admin == true
  end
end
