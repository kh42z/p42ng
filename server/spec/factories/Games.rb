FactoryBot.define do
  factory :game do
    player_left { FactoryBot.create(:user) }
    player_right { FactoryBot.create(:user) }
    association :game_type
  end
end

FactoryBot.define do
  factory :game_type do
    name { Faker::Name.unique.name }
  end
end