class GuildOfficer < ApplicationRecord
  validates_presence_of :user
  validates_presence_of :guild
  belongs_to :user
  belongs_to :guild
end
