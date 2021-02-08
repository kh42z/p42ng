# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    privacy { rand(0..2) }
    password_digest { Faker::Internet.password }
    owner { User.create() }
  end
end
