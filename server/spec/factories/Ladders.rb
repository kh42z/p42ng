FactoryBot.define do
  factory :ladder do
    name { Faker::Name.unique.name }
    desc { Faker::Lorem }
    mmr_threshold { Faker::Number.between(from: 200, to: 1200)}
  end
end
