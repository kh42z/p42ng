# frozen_string_literal: true

class GameEngineJob < ApplicationJob
  include(CacheHelper)
  queue_as :default

  def perform(pong)
    pong.start
    turn(pong) until pong.over
    pong.game.update(state: 3)
  end

  def turn(pong)
    paddle_left = game_get_paddle_pos(pong.game.id, pong.game.player_left.id)
    paddle_right = game_get_paddle_pos(pong.game.id, pong.game.player_right.id)
    pong.tick(paddle_left, paddle_right)
    sleep(0.01.seconds)
  end
end
