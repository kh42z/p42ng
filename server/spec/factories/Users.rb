# frozen_string_literal: true

FactoryBot.define do
  factory :user, aliases: [:owner] do
    nickname { Faker::Name.unique.name }
    image_url { Faker::Internet.url }
    two_factor { Faker::Boolean.boolean }
    first_login { Faker::Boolean.boolean }
    password { Faker::Internet.password(min_length: 8, max_length: 10, mix_case: true) }
    two_factor_code { Faker::Internet.password(min_length: 8, max_length: 10, mix_case: true) }
    email { Faker::Internet.email }
    ladder_games_won { Faker::Number.number(digits: 3) }
    ladder_games_lost { Faker::Number.number(digits: 3) }
    status { "offline" }
    association :ladder
  end
end
