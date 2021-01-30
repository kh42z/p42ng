# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    nickname { Faker::Name }
    avatar { Faker::Avatar }
    two_factor { Faker::Boolean }
    status { 0 }
    ladder
  end
end
