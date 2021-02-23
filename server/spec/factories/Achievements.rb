FactoryBot.define do

  factory :achievement do
    name { Faker::Name.unique }
    description { Faker::Lorem.sentences(number: 1) }
  end

  factory :user_achievement do
    achievements { FactoryBot.create_list(:achievement, 2) }
    user { FactoryBot.create(:user) }
  end
end
