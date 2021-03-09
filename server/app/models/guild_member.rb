# frozen_string_literal: true

class GuildMember < ApplicationRecord
  validates_presence_of :user
  validates_uniqueness_of :user_id
  validates_presence_of :guild
  belongs_to :user
  belongs_to :guild
end
