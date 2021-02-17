FactoryBot.define do
  factory :gameRecord do
    winner { FactoryBot.create(:user) }
    looser { FactoryBot.create(:user) }
    type_id { 0 }
  end
end