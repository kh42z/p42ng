# frozen_string_literal: true

module ScoreHelper
  SCORE_INCREMENT = 10

  def game_point_assignment(game)
    winner_side(game)
    @winner.guild_member&.guild&.increment!(:score, SCORE_INCREMENT)
    war_duel_point unless game.mode['duel'].nil?
  end

  def winner_side(game)
    if game.winner == game.player_left
      @winner = game.player_left
      @looser = game.player_right
    else
      @looser = game.player_left
      @winner = game.player_right
    end
  end

  def war_duel_point
    w_guild = @winner.guild_member&.guild
    l_guild = @looser.guild_member&.guild
    return unless w_guild && l_guild

    War.where(from: w_guild, on: l_guild).first&.increment!(:from_score, SCORE_INCREMENT)
    War.where(from: l_guild, on: w_guild).first&.increment!(:on_score, SCORE_INCREMENT)
  end
end
