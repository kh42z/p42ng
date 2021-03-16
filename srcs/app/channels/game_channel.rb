# frozen_string_literal: true

class GameChannel < ApplicationCable::Channel
  periodically :tick, every: 1.seconds

  def subscribed
    @game = Game.find(params[:id])

    return reject if player? == false && @game.state.zero?

    stream_from "game_#{@game.id}"
    @game.update!(state: @game.state + 1)

    return unless @game.state > 1

    @pong = GameEngine.new(@game)
    @pong.start
  end

  def received(data)
    return if @pong.nil? || player? == false || data.key?('message') == false

    d = JSON.parse(data['message'])
    @pong.move(current_user.id, d['position'])
  end

  def unsubscribed
    @game.update!(state: @game.state - 1) if @pong.nil?
  end

  private

  def tick
    return if @pong.nil?

    @pong.tick
  end

  def player?
    @game.player_left.id == current_user.id || @game.player_right.id == current_user.id
  end
end
