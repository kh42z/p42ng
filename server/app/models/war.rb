# frozen_string_literal: true

class War < ApplicationRecord
  validates_presence_of :versus
  validates_uniqueness_of :versus, scope: :guild
  validates_presence_of :war_start
  validates_presence_of :war_end
  validates_presence_of :prize
  validates_presence_of :from_score
  validates_presence_of :on_score
  validates_presence_of :max_unanswered
  belongs_to :guild
  has_many :war_terms
  has_one :war_time
end
