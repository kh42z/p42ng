class Guild < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :anagram
end
