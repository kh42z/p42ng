# frozen_string_literal: true

FactoryBot.define do
  factory :war do
    from { create(:guild).id }
    on { create(:guild).id }
    war_start { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    war_end { Faker::Time.between(from: DateTime.now, to: DateTime.now + 2) }
    prize { rand(10..100) }
    from_score { rand(1..20) }
    on_score { rand(1..20) }
    max_unanswered { rand(1..10) }
    guild_id { from }
  end
end
