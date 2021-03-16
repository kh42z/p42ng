# frozen_string_literal: true

FactoryBot.define do
  factory :user_achievement do
    achievement { FactoryBot.create(:achievement) }
    user { FactoryBot.create(:user) }
  end

  factory :achievement do
    name { Faker::Games::ElderScrolls.unique.creature }
    description { Faker::Lorem.sentences(number: 1) }
    factory :achievement_with_users do
      transient do
        users_count { 2 }
      end
      after(:create) do |achievement, evaluator|
        create_list(:user_achievement, evaluator.users_count, achievement: achievement)
        achievement.reload
      end
    end
  end
end
