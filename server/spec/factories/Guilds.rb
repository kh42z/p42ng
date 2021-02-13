FactoryBot.define do
  factory :guild_officer do
    user
    guild
  end

  factory :guild do
    name { Faker::Name.unique.name }
    anagram { Faker::Name.initials(number: 5) }
    owner_id { FactoryBot.create(:user).id }
    factory :guild_with_officers do
      transient do
        officers_count { 5 }
      end
      after(:create) do |guild, evaluator|
        create_list(:guild_officer, evaluator.officers_count, guild: guild)
        guild.reload
      end
    end
  end
end
