# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    nickname { Faker::Name.unique.name }
    image_url { Faker::Internet.url }
    two_factor { Faker::Boolean.boolean }
    password { Faker::Internet.password }
    email { Faker::Internet.email }
    ladder_games_won { Faker::Number.number(digits: 3) }
    ladder_games_lost { Faker::Number.number(digits: 3) }
    ladder
    state
  end
end
