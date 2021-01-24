class User < ApplicationRecord
  has_one :guild
  has_one :ladder
  validates_presence_of :nickname
end
