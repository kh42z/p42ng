require 'rails_helper'

RSpec.describe Player do

  it 'constructor allows to set side' do
    player = Player.new('left')
    expect(player.side).to eq('left')
  end
end
