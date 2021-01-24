class User < ApplicationRecord
  belongs_to :guild
  belongs_to :ladder
  validates_presence_of :nickname
end
