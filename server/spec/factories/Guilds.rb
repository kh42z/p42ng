FactoryBot.define do
  factory :guild do
    name { Faker::Name.unique.name }
    anagram { Faker::Name.initials(number: 5) }
    owner
  end
end

FactoryBot.define do
  factory :guild_officer do
    user factory: :user
    guild factory: :guild
  end
end

