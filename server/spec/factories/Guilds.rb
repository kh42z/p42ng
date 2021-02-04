FactoryBot.define do
  factory :guild do
    name { Faker::Name.unique.name }
    anagram { Faker::Name.initials(number: 5) }
    owner { user }
  end
end