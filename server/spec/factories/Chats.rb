# frozen_string_literal: true

FactoryBot.define do

  factory :chat do
    privacy { %w[public private].sample }
    owner_id { create(:user).id }
    name { "#{owner.nickname}'s chat" }
  end

  factory :chat_admin do
    chat
    user
  end

  factory :chat_participant do
    chat
    user
  end

  factory :chat_ban do
    chat
    user
  end

  factory :chat_timeout do
    chat
    user
  end
end
