require 'rails_helper'

RSpec.describe GameEngine do
  let(:left) { create(:user) }
  let(:right) { create(:user) }
  let(:game) { create(:game, player_left: left, player_right: right)}
  let(:ge) { GameEngine.new(game) }
  it 'constructor sets players side' do
    expect(ge.players[left.id].side).to eq('left')
    expect(ge.players[right.id].side).to eq('right')
  end

  it 'move set player position' do
    ge.move(left.id, 20)
    expect(ge.players[left.id].position).to eq(20)
  end


  it 'forfeit should' do
    #expect {  }.to have_broadcasted_to("user_#{right.id}")
    ge.forfeit(left.id)
    game.reload
    expect(game.winner_id).to  eq(right.id)
  end
end