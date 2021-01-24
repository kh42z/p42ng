FactoryBot.define do
  factory :user do
    title { nickname::Lorem.word }
    created_by { Faker::Number.number(10) }
  end
end
