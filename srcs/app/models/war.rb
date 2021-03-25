# frozen_string_literal: true

class War < ApplicationRecord
  validates_presence_of :from
  validates_presence_of :on
  validates_presence_of :war_start
  validates_presence_of :war_end
  validates_presence_of :prize
  validates_presence_of :max_unanswered
  validate :start_before_end
  validate :from_must_not_eq_on

  belongs_to :from, class_name: 'Guild'
  belongs_to :on, class_name: 'Guild'
  has_many :war_addons
  has_many :war_times

  def from_must_not_eq_on
    valid = from && on && from != on
    errors.add(:from, "can't be equal to 'on'") unless valid
  end

  def start_before_end
    valid = war_start && war_end && war_start < war_end
    errors.add(:war_start, 'must be before end time') unless valid
  end

  # def guilds
  #  [from] + [on]
  # end
end
