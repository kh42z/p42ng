# frozen_string_literal: true

class User < ApplicationRecord
  # extend Devise::Models
  devise :database_authenticatable, :registerable,
         :validatable, :omniauthable

  include DeviseTokenAuth::Concerns::User
  belongs_to :ladder, optional: true
  belongs_to :guild, optional: true
  has_many :chats, foreign_key: 'owner_id'
  belongs_to :state, optional: true
  validates_presence_of :nickname
  validates_presence_of :image_url
  validates_inclusion_of :two_factor, in: [true, false]
  validates_presence_of :ladder_games_won
  validates_presence_of :ladder_games_lost
end
