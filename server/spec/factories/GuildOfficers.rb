FactoryBot.define do
  factory :guild_officer do
    user factory: :user
    guild factory: :guild
  end
end
