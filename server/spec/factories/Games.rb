FactoryBot.define do
  factory :game do
    winner { FactoryBot.create(:user) }
    looser { FactoryBot.create(:user) }
    association :game_type
  end
end

FactoryBot.define do
  factory :game_type do
    name { Faker::Name.unique.name }
  end
end