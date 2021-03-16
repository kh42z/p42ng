# frozen_string_literal: true

class GameEngine
  attr_accessor :ball
  attr_reader :players, :left, :right

  HORIZONTAL_LIMIT = 512
  VERTICAL_LIMIT = 256
  SCORE_LIMIT = 21

  def initialize(game)
    @game = game
    @left = Player.new('left')
    @right = Player.new('right')
    @players = []
    @players[@game.player_left.id] = @left
    @players[@game.player_right.id] = @right
  end

  def start
    @ball = Ball.new(VERTICAL_LIMIT, HORIZONTAL_LIMIT)
  end

  def move(user_id, position)
    return unless vertically_inside?(position)

    @players[user_id].move(position)
  end

  def tick
    @ball.move
    give_point if @ball.score?

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
    @players[@game.player_left.id].score += 1
    forfeit(@game.player_right.id) if @left.score > SCORE_LIMIT
    start
  end

  def vertically_inside?(pos)
    pos.positive? && pos < VERTICAL_LIMIT
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
