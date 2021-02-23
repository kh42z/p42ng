FactoryBot.define do
  factory :war do
    from { create(:guild) }
    on { create(:guild) }
    war_start { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    war_end { Faker::Time.between(from: DateTime.now, to: DateTime.now + 2) }
    prize { range(10..100) }
    from_score { range(1..20) }
    on_score { range(1..20) }
    max_unanswered { range(1..10) }
  end
end

