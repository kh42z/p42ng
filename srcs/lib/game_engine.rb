# frozen_string_literal: true

class GameEngine
  attr_accessor :ball
  attr_reader :left, :right

  SCORE_LIMIT = 21

  def initialize(game)
    @game = game
    @left = Player.new('left', @game.player_left.id)
    @right = Player.new('right', @game.player_right.id)
  end

  def start
    @ball = Ball.new
  end

  def move(user_id, position)
    if left.user_id == user_id
      left.move(position)
    else
      right.move(position)
    end
  end

  def tick
    @ball.move(left.position, right.position)
    give_point if @ball.scores?

    game_state = { player_left: { pos: @left.read_position, score: @left.score },
                   player_right: { pos: @right.read_position,
                                   score: @right.score },
                   ball: @ball }
    ActionCable.server.broadcast("game_#{@game.id}", game_state.to_json)
  end

  def forfeit(user_id)
    winner(other_one(user_id))
    notify_looser(user_id)
  end

  def give_point
    if @ball.x < 1
      right_score
    else
      left_score
    end
  end

  private

  def right_score
    @right.score += 1
    forfeit(@game.player_left.id) if @right.score > SCORE_LIMIT
    start
  end

  def left_score
    @left.score += 1
    forfeit(@game.player_right.id) if @left.score > SCORE_LIMIT
    start
  end

  def other_one(user_id)
    if @game.player_left.id == user_id
      @game.player_right.id
    else
      @game.player_left.id
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
