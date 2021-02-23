# frozen_string_literal: true

class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])

    return reject if reject_user?

    stream_for @game
  end

  def received(data)
    broadcast_to(@game, data['message'])
  end

  def unsubscribed; end

  private

  def reject_user?
    return false if @game.player_left.id == current_user.id || @game.player_right.id == current_user.id

    true
  end
end
