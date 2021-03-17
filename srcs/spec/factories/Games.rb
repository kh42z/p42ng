# frozen_string_literal: true

FactoryBot.define do
  factory :game do
    player_left { FactoryBot.create(:user) }
    player_right { FactoryBot.create(:user) }
    game_type { 'duel' }
    state { 0 }
  end
end
