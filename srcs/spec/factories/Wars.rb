# frozen_string_literal: true

FactoryBot.define do
  factory :war do
    prize { rand(10..100) }
    from_score { rand(1..20) }
    on_score { rand(1..20) }
    max_unanswered { rand(1..10) }
  end
end
