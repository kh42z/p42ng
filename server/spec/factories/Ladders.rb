# frozen_string_literal: true

FactoryBot.define do
  factory :ladder do
    name { Faker::Name.unique.name }
    desc { Faker::Lorem }
  end
end
