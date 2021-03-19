# frozen_string_literal: true

FactoryBot.define do
  factory :user, aliases: [:owner] do
    nickname { Faker::Name.unique.first_name }
    avatar { Rack::Test::UploadedFile.new(Rails.root.join('public', 'images', 'profile-pic.jpg'), 'image/jpg') }
    two_factor { Faker::Boolean.boolean }
    first_login { Faker::Boolean.boolean }
    password { 'secure' }
    two_factor_code { '0123456' }
    email { Faker::Internet.email }
    ladder_games_won { Faker::Number.number(digits: 3) }
    ladder_games_lost { Faker::Number.number(digits: 3) }
    status { 'offline' }
    association :ladder
  end

  factory :ignore do
    user { create(:user) }
    user_ignored { create(:user) }
  end
end
