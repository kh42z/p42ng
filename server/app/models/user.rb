# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :ladder, optional: true
  validates_presence_of :nickname
  validates_presence_of :avatar
  validates_presence_of :two_factor
  validates_presence_of :status
end
