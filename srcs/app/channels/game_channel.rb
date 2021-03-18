# frozen_string_literal: true

class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:id])

    return reject if @game.status == 'played'

    stream_from "game_#{@game.id}"

    return unless player?

    @game.with_lock do
      @game.reload
      @game.connected_players += 1
      GameEngineJob.perform_later(@game, 0) if @game.connected_players == 2
      @game.save!
    end
  end

  def received(data)
    return if player? == false || data.key?('message') == false

    msg = JSON.parse(data['message'])
    game_set_paddle_pos(@game.id, current_user.id, msg['position']) if msg.key?('position')
  end

  def unsubscribed
    return if player? == false

    @game.with_lock do
      @game.reload
      @game.connected_players -= 1
      @game.save!
    end
  end

  private

  def player?
    @game.player_left.id == current_user.id || @game.player_right.id == current_user.id
  end
end
