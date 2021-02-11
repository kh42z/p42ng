# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    privacy { rand(0..2) }
    password_digest { Faker::Internet.password }
    owner
  end
end

FactoryBot.define do
  factory :chat_admin do
    chat
    user
  end
end
