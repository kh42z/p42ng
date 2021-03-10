# frozen_string_literal: true

class GuildMember < ApplicationRecord
  validates_presence_of :user
  validates_uniqueness_of :user_id
  validates_presence_of :guild
  enum rank: %i[member officer owner]
  validates_uniqueness_of :rank, scope: :guild, if: :rank_owner
  belongs_to :user
  belongs_to :guild

  def rank_owner
    rank == 'owner'
  end
end
