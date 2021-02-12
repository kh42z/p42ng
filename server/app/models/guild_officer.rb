# frozen_string_literal: true

class GuildOfficer < ApplicationRecord
  validates_presence_of :user, uniqueness: { scope: :user_id }
  validates_presence_of :guild
  belongs_to :user
  belongs_to :guild
end
