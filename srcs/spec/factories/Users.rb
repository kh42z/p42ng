# frozen_string_literal: true

FactoryBot.define do
  factory :user, aliases: [:owner] do
    nickname { Faker::Name.unique.first_name }
    # disabling Avatar upload to avoid filling our disk every time we launch rspec
    #avatar { Rack::Test::UploadedFile.new(Rails.root.join('public', 'images', 'profile-pic.jpg'), 'image/jpg') }
    two_factor { Faker::Boolean.boolean }
    first_login { Faker::Boolean.boolean }
    password { 'secure' }
    two_factor_code { '0123456' }
    email { Faker::Internet.email }
    ladder_games_won { Faker::Number.number(digits: 3) }
    ladder_games_lost { Faker::Number.number(digits: 3) }
    status { 'offline' }

    factory :user_with_guild do
      transient do
        guild { guild }
        rank { rank }
      end
      after(:create) do |user, evaluator|
        create(:guild_member, guild: evaluator.guild, user: user, rank: evaluator.rank)
      end
    end

    factory :user_of_chat do
      transient do
        chat { chat }
      end
      after(:create) do |user, evaluator|
        ChatParticipant.create(chat: evaluator.chat, user: user)
      end
    end

    factory :user_admin_of_chat do
      transient do
        chat { chat }
      end
      after(:create) do |user, evaluator|
        ChatAdmin.create(chat: evaluator.chat, user: user)
        ChatParticipant.create(chat: evaluator.chat, user: user)
      end
    end
  end

  factory :ignore do
    user { create(:user) }
    user_ignored { create(:user) }
  end


end
