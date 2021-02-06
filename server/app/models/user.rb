# frozen_string_literal: true

class User < ApplicationRecord
  # extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  include DeviseTokenAuth::Concerns::User
  # belongs_to :ladder, optional: true
  # belongs_to :guild, optional: true
  # validates_presence_of :nickname
  # validates_presence_of :avatar
  # validates_presence_of :two_factor
  # validates_presence_of :status
end
