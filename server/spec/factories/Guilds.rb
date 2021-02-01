FactoryBot.define do
  factory :guild do
    name { Faker::Name.unique.name }
    anagram { Faker::Name.initials(number: 5) }
  end
end
