# frozen_string_literal: true

class GameEngine
  def initialize(game)
    @game = game
    @players = []
    @players[game.player_left.id] = Player.new('left')
    @players[game.player_right.id] = Player.new('right')
    @ball = { x: 10, y: 10 }
  end

  def start
    # puts "GAME STARTED"
  end

  def set_dir(user_id, direction)
    @players[user_id] = direction
  end

  def tick
    @players.each(&:move)
    game_state = { player_left: { pos: @players[@game.player_left].position, score: @players[@game.player_left].score },
                   player_right: { pos: @players[@game.player_right].position,
                                   score: @players[@game.player_right].score },
                   ball: @ball }
    ActionCable.server.broadcast(@game, game_state.to_json)
  end

  def forfeit(user_id)
    winner(other_one(user_id))
  end

  private

  def other_one(user_id)
    if @game.player_left == user_id
      @game.player_right
    else
      @game.player_left
    end
  end

  def winner(winner_id)
    notify_winner(winner_id)
    @game.update!(winner_id: winner_id)
  end

  def notify_winner(user_id)
    ActionCable.server.broadcast(User.find(user_id), { action: 'game_won', id: @game.id })
  end

  def notify_looser(user_id)
    ActionCable.server.broadcast(User.find(user_id), { action: 'game_lost', id: @game.id })
  end
end
