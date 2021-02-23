# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :validatable, :omniauthable

  include DeviseTokenAuth::Concerns::User

  belongs_to :ladder, optional: true
  belongs_to :guild, optional: true

  has_one :guild_officer, dependent: :destroy
  has_one_attached :avatar

  has_many :chats, foreign_key: 'owner_id'
  has_many :user_achievements
  has_many :friendships, ->(user) { where('friend_a_id = ? OR friend_b_id = ?', user.id, user.id) }
  has_many :friends, through: :friendships

  validates_presence_of :nickname
  validates :nickname, uniqueness: true
  validates_presence_of :image_url
  validates_inclusion_of :two_factor, in: [true, false]
  validates_inclusion_of :first_login, in: [true, false]
  validates_inclusion_of :admin, in: [true, false]
  validates_inclusion_of :banned, in: [true, false]
  validates_inclusion_of :status, in: %w[Offline Online InGame]
  validates_presence_of :ladder_games_won
  validates_presence_of :ladder_games_lost
end
