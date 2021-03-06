# frozen_string_literal: true

class WarSerializer < ActiveModel::Serializer
  attributes :id, :from_id, :on_id, :war_start, :war_end, :prize, :from_score,
             :on_score, :max_unanswered, :terms_agreed, :ladder_effort, :tournament_effort,
             :from_agreement, :on_agreement, :opened, :closed, :last_negotiation
end
