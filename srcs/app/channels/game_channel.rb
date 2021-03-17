# frozen_string_literal: true

class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:id])

    return reject if @game.state > 2

    stream_from "game_#{@game.id}"

    return unless player?

    @game.update!(state: @game.state + 1)

    return unless @game.state > 1

    GameEngineJob.perform_now(GameEngine.new(@game))
  end

  def received(data)
    return if player? == false || data.key?('message') == false

    msg = JSON.parse(data['message'])
    game_set_paddle_pos(@game.id, current_user.id, msg['position']) if msg.key?('position')
  end

  def unsubscribed
    @game.reload
    # if players leaves before the game started
    @game.update!(state: @game.state - 1) if @game.state <= 2 && player?
  end

  private

  def player?
    @game.player_left.id == current_user.id || @game.player_right.id == current_user.id
  end
end
