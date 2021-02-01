# frozen_string_literal: true

class Guild < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :anagram
  validates :anagram, length: { is: 5 }, allow_blank: false, uniqueness: true
  validates :name, uniqueness: true
end
