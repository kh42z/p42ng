FactoryBot.define do
  factory :guild_officer do
    user { FactoryBot.create(:user, guild: guild) }
    guild
  end

  factory :guild do
    name { Faker::Games::ElderScrolls.unique.creature }
    anagram { Faker::Name.initials(number: 5) }
    owner_id { FactoryBot.create(:user).id }
    factory :guild_with_officers do
      transient do
        officers_count { 2 }
      end
      after(:create) do |guild, evaluator|
        create_list(:guild_officer, evaluator.officers_count, guild: guild)
        guild.reload
        User.find(guild.owner_id).update!(guild: guild)
      end
    end
  end
end
