# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player do
  let(:player) { Player.new('left', 1) }
  it 'constructor allows to set side' do
    expect(player.side).to eq('left')
  end

  it 'updated attribute changes' do
    player.move(20)
    expect(player.updated).to eq(true)
    expect(player.read_position).to eq(20)
    expect(player.updated).to eq(false)
  end
end
