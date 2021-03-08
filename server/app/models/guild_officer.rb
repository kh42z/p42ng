# frozen_string_literal: true

class GuildOfficer < ApplicationRecord
  validates_presence_of :user
  validates_uniqueness_of :user_id, scope: :guild
  validates_presence_of :guild
  belongs_to :user
  belongs_to :guild
end
