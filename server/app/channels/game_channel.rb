# frozen_string_literal: true

class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])

    return reject if accept_user? == false

    stream_for @game
    @game.update!(state: @game.state + 1)

    return unless @game.state > 1

    @pong = Pong.new(@game)
    @pong.start
  end

  def received(data)
    @pong.set_dir(current_user.id, data['direction'])
  end

  def unsubscribed
    if @pong.nil?
      @game.update!(state: @game.state - 1)
    else
      @pong.forfeit(current_user.id)
    end
  end

  private

  def accept_user?
    @game.player_left.id == current_user.id || @game.player_right.id == current_user.id
  end
end
