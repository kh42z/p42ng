# frozen_string_literal: true

class GameEngine
  attr_accessor :ball, :over, :turns_limit
  attr_reader :left, :right, :game

  SCORE_LIMIT = 21
  REFRESH_RATE = 100

  def initialize(game)
    @game = game
    @turns = 0
    @turns_limit = 0
    @over = false
    @left = Player.new('left', @game.player_left.id)
    @right = Player.new('right', @game.player_right.id)
  end

  def start
    @ball = Ball.new
  end

  def tick(paddle_left, paddle_right)
    @left.move(paddle_left)
    @right.move(paddle_right)
    @ball.move(@left.position, @right.position)
    give_point if @ball.scores?
    # turns_limit allows rspec tests to exit after 1 turn
    @over = true if @turns_limit.positive? && @turns > @turns_limit

    game_state = update_state
    ActionCable.server.broadcast("game_#{@game.id}", game_state) if game_state.length.positive?
    @turns += 1
  end

  def forfeit(user_id)
    winner(other_one(user_id))
    notify_looser(user_id)
    @over = true
  end

  def give_point
    if @ball.x < 1
      right_score
    else
      left_score
    end
  end

  private

  def update_state
    refresh_all_objects if (@turns % REFRESH_RATE).zero?
    game_state = {}
    game_state[:player_left] = update_player(@left) if @left.updated
    game_state[:player_right] = update_player(@right) if @right.updated
    game_state[:ball] = update_ball if @ball.updated
    game_state
  end

  def refresh_all_objects
    @left.updated = true
    @right.updated = true
    @ball.updated = true
  end

  def update_player(player)
    player.updated = false
    { pos: player.position, score: player.score }
  end

  def update_ball
    ball.updated = false
    { x: @ball.x, y: @ball.y, left: @ball.left, up: @ball.up }
  end

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
    ActionCable.server.broadcast("user_#{user_id}", { action: 'game_won', id: @game.id })
  end

  def notify_looser(user_id)
    ActionCable.server.broadcast("user_#{user_id}", { action: 'game_lost', id: @game.id })
  end
end
