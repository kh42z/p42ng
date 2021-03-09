# frozen_string_literal: true

class Guild < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :anagram
  validates :name, uniqueness: true
  validates :anagram, length: { is: 5 }, allow_blank: false, uniqueness: true
  belongs_to :owner, class_name: 'User'
  has_many :officers, class_name: 'GuildOfficer', dependent: :destroy
  has_many :members, class_name: 'GuildMember', dependent: :destroy
  has_many :wars, dependent: :destroy
end
