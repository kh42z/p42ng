FactoryBot.define do
  factory :state do
    name { Faker::Name.unique.name }
  end
end
