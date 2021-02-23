FactoryBot.define do
  factory :game do
    player_left { FactoryBot.create(:user) }
    player_right { FactoryBot.create(:user) }
    game_type { 'Duel' }
  end
end

