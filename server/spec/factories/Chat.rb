FactoryBot.define do
  factory :chat do
    privacy { 0 }
    password { "" }
    owner factory: user
  end
end
