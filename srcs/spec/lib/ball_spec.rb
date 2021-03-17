# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ball do
  let(:ball) { Ball.new }

  it 'asserts ball moves correctly' do
    ball.x = 128
    ball.y = 128
    ball.up = false
    ball.left = false
    ball.move(1, 1)
    expect(ball.x).to eq(129)
    expect(ball.y).to eq(127)
    ball.up = true
    ball.left = true
    ball.move(1, 1)
    expect(ball.x).to eq(128)
    expect(ball.y).to eq(128)
  end

  it 'asserts score?' do
    ball.x = 0
    expect(ball.scores?).to eq(true)
    ball.x = Ball::HORIZONTAL_LIMIT
    expect(ball.scores?).to eq(true)
    ball.x = 128
    expect(ball.scores?).to eq(false)
  end

  it 'should hit left paddle' do
    ball.x = Player::PADDLE_PADDING + 1
    ball.y = 119
    ball.left = true
    ball.move(128, 1)
    expect(ball.left).to eq(false)
    expect(ball.x).to eq(Player::PADDLE_PADDING + 2)
  end

  it 'should hit right paddle' do
    ball.x = BoardObject::HORIZONTAL_LIMIT - Player::PADDLE_PADDING - 1
    ball.y = 119
    ball.left = false
    ball.move(1, 128)
    expect(ball.left).to eq(true)
    expect(ball.x).to eq(BoardObject::HORIZONTAL_LIMIT - Player::PADDLE_PADDING - 2)
  end

  it 'should miss the right paddle' do
    ball.x = BoardObject::HORIZONTAL_LIMIT - Player::PADDLE_PADDING - 1
    ball.y = 128
    ball.left = false
    ball.move(1, 117)
    expect(ball.left).to eq(false)
    expect(ball.x).to eq(BoardObject::HORIZONTAL_LIMIT - Player::PADDLE_PADDING)
  end

  it 'should miss the left paddle' do
    ball.x = Player::PADDLE_PADDING + 1
    ball.y = 128
    ball.left = true
    ball.move(139, 1)
    expect(ball.left).to eq(true)
    expect(ball.x).to eq(Player::PADDLE_PADDING)
  end
end
