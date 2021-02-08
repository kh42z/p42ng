# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    nickname { Faker::Name.unique.name }
    image_url { Faker::Internet.url }
    two_factor { Faker::Boolean.boolean }
    status { 0 }
    password { Faker::Internet.password }
    email { Faker::Internet.email }
    mmr { Faker::Number.number(digits: 3) }
    ladder
  end
end
