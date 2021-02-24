require 'rails_helper'

RSpec.describe Game, type: :model do
  it { should belong_to(:winner) }
  it { should belong_to(:player_left) }
  it { should belong_to(:player_right) }
  it { should allow_values(true, false).for(:started) }
  it { should allow_values('duel', 'ladder', 'tournament').for(:game_type) }
end
