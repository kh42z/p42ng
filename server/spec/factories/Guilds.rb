FactoryBot.define do
  factory :guild_officer do
    user { create(:user) }
    guild
    after(:create) do |guild_officer, evaluator|
      GuildMember.create(user: guild_officer.user, guild: guild_officer.guild)
    end
  end

  factory :guild_member do
    user { create(:user) }
    guild { create(:guild) }
  end

  factory :guild do
    name { Faker::Games::ElderScrolls.unique.creature }
    anagram { Faker::Name.initials(number: 5) }
    factory :guild_with_officers do
      transient do
        officers_count { 2 }
      end
      after(:create) do |guild, evaluator|
        create_list(:guild_officer, evaluator.officers_count, guild: guild)
        guild.reload
        GuildMember.create(user_id: guild.owner_id, guild: guild)
      end
    end
  end
end
