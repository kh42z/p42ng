# frozen_string_literal: true

class Guild < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :anagram
  validates :name, uniqueness: true
  validates :anagram, length: 3..5, allow_blank: false, uniqueness: true
  has_many :members, class_name: 'GuildMember', dependent: :destroy
  has_many :officers, -> { where(rank: 'officer') }, class_name: 'GuildMember'
  has_one :owner, -> { where(rank: 'owner') }, class_name: 'GuildMember'

  # https://stackoverflow.com/questions/24642005/rails-association-with-multiple-foreign-keys
  has_many :wars, ->(guild) { unscope(:where).where(from: guild).or(where(on: guild)) }

  # def owner
  #   User.where(id: members.where(rank: 'owner').pluck(:user_id)).first
  # end

  def wars_from_enemy
    War.where(on: id)
  end
end
