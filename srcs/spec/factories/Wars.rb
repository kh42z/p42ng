# frozen_string_literal: true

FactoryBot.define do
  factory :war do
    from { create(:guild).id }
    on { create(:guild).id }
    war_start { Faker::Time.between(from: DateTime.now, to: DateTime.new(2022)) }
    war_end { Faker::Time.between(from: DateTime.new(2022), to: DateTime.new(2024)) }
    prize { rand(10..100) }
    from_score { rand(1..20) }
    on_score { rand(1..20) }
    max_unanswered { rand(1..10) }
    guild_id { from }
  end
end
