# frozen_string_literal: true

FactoryBot.define do

  factory :chat_admin do
    chat
    user
  end

  factory :chat do
    privacy { rand(0..2) }
    password_digest { Faker::Internet.password }
    owner_id { FactoryBot.create(:user).id }
    factory :chat_with_admins do
      transient do
        admins_count { 2 }
      end
      after(:create) do |chat, evaluator|
        create_list(:chat_admin, evaluator.admins_count, chat: chat)
      end
    end
  end
end
