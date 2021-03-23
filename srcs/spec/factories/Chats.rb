# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    privacy { %w[public private].sample }
    name { "Chatroom" }
    transient do
      owner { create(:user) }
    end
    after(:create) do |chat, evaluator|
      create(:chat_participant, chat: chat, role: 'owner', user: evaluator.owner)
      chat.update!(name: "#{evaluator.owner.nickname}'s chat")
    end

    factory :chat_with_messages do
      transient do
        messages_count { 3 }
      end
      after(:create) do |chat, evaluator|
        create_list(:chat_message, evaluator.messages_count, chat: chat, sender_id: chat.owner.id)
      end
    end
  end

  factory :chat_participant do
    chat
    user
    role { 'participant' }
  end

  factory :chat_admin do
    chat
    user
    role { 'admin' }
  end

  factory :chat_message do
    chat
    sender_id { create(:user) }
    content { Faker::Books::Lovecraft.paragraph_by_chars(characters: 256) }
  end
end
