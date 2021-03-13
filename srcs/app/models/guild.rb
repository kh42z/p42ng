# frozen_string_literal: true

class Guild < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :anagram
  validates :name, uniqueness: true
  validates :anagram, length: 3..5, allow_blank: false, uniqueness: true
  has_many :members, class_name: 'GuildMember', dependent: :destroy
  has_many :wars, dependent: :destroy
  def officers
    members.where(rank: 'officer')
  end

  def owner
    User.find(members.where(rank: 'owner').pluck(:user_id).first)
  end
end
