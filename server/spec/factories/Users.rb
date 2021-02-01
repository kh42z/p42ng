# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    nickname { Faker::Name.unique.name }
    avatar { Faker::Avatar }
    two_factor { 1 }
    status { 0 }
    ladder
  end
end
