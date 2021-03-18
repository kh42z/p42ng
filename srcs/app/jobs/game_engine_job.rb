# frozen_string_literal: true

class GameEngineJob < ApplicationJob
  include(CacheHelper)
  include(UserStatusHelper)
  queue_as :default

  def perform(game, turns_limit)
    change_players_status(game, 'ingame')
    pong = GameEngine.new(game, turns_limit)
    pong.start
    turn(pong) until pong.over
    pong.game.update(state: 3)
    change_players_status(game, 'online')
  end

  def turn(pong)
    paddle_left = game_get_paddle_pos(pong.game.id, pong.game.player_left.id)
    paddle_right = game_get_paddle_pos(pong.game.id, pong.game.player_right.id)
    pong.tick(paddle_left, paddle_right)
    sleep(0.01.seconds)
  end

  def change_players_status(game, status)
    update_user_status(game.player_left, status)
    update_user_status(game.player_right, status)
  end
end
