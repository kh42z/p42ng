# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    privacy { %w[public private].sample }
    owner_id { create(:user).id }
    name { "#{owner.nickname}'s chat" }
    factory :chat_with_messages do
      transient do
        messages_count { 3 }
      end
      after(:create) do |chat, evaluator|
        create_list(:chat_message, evaluator.messages_count, chat: chat, sender_id: chat.owner_id)
      end
    end
  end

  factory :chat_admin do
    chat
    user
  end

  factory :chat_participant do
    chat
    user
  end

  factory :chat_message do
    chat
    sender_id { create(:user) }
    content { Faker::Books::Lovecraft.paragraph_by_chars(characters: 256) }
  end
end
