# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  belongs_to :ladder, optional: true

  has_one :guild_member, dependent: :destroy
  has_one_attached :avatar

  has_many :chats, foreign_key: 'owner_id', dependent: :destroy
  has_many :chat_participant, dependent: :destroy
  has_many :chat_admin, dependent: :destroy
  has_many :user_achievements, dependent: :destroy
  has_many :achievements, through: :user_achievements
  has_many :ignores, foreign_key: 'user_id', dependent: :destroy, class_name: 'UserIgnore'
  has_many :friendship
  validates_presence_of :nickname
  validates :nickname, uniqueness: true
  validates_inclusion_of :two_factor, in: [true, false]
  validates_inclusion_of :first_login, in: [true, false]
  validates_inclusion_of :admin, in: [true, false]
  validates_inclusion_of :banned, in: [true, false]
  validates_inclusion_of :status, in: %w[offline online ingame]
  validates_presence_of :ladder_games_won
  validates_presence_of :ladder_games_lost

  has_secure_password :two_factor_code, validations: false

  def guild
    guild_member&.guild
  end

  def wars
    guild&.wars
  end

  def wars_from_enemy
    guild&.wars_from_enemy
  end
end
