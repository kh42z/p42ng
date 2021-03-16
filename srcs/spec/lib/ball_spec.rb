require 'rails_helper'

RSpec.describe Ball do
  let(:ball) { Ball.new(256, 512) }

  it 'asserts ball moves correctly' do
    ball.x = 128
    ball.y = 128
    ball.up = false
    ball.left = false
    ball.move
    expect(ball.x).to eq(129)
    expect(ball.y).to eq(127)
    ball.up = true
    ball.left = true
    ball.move
    expect(ball.x).to eq(128)
    expect(ball.y).to eq(128)
  end

  it 'asserts score?' do
    ball.x = 0
    expect(ball.score?).to eq(true)
    ball.x = 512
    expect(ball.score?).to eq(true)
    ball.x = 128
    expect(ball.score?).to eq(false)
  end
end
