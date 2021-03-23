# frozen_string_literal: true

FactoryBot.define do
  factory :guild do
    name { Faker::Name.unique.name }
    anagram { Faker::Name.initials(number: 5) }
    score { rand(0..100) }
    factory :guild_with_officers do
      transient do
        officers_count { 2 }
      end
      after(:create) do |guild, evaluator|
        create_list(:guild_member, evaluator.officers_count, guild: guild, rank: 'officer')
      end
    end
    factory :guild_with_members do
      transient { count {2} }
      after(:create) do |guild, evaluator|
        create_list(:guild_member, evaluator.count, guild: guild, rank: 'member')
      end
    end
  end

  factory :guild_member do
    user
    guild
    rank { 'member' }
  end
end
