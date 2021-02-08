# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    privacy { rand(0..2) }
    password { "" }
    owner factory: user
  end
end
