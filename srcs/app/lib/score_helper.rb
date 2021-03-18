# frozen_string_literal: true

module ScoreHelper
  POINTS = 10

  def game_point_assignment(game)
    winner_side(game)
    @winner.guild_member&.guild&.increment!(:score, POINTS)
    war_effort_point if set_war
    ladder_point unless game.game_type['ladder'] == 'ladder'
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

  def ladder_point
    @winner.increment!(:ladder_games_won)
    @looser.increment!(:ladder_games_lost)
  end

  def war_effort_point
    war_point(POINTS) if game.game_type['duel'] == 'duel'
    war_point(POINTS) if game.game_type['ladder'] == 'ladder' && @war.ladder_effort == true
    # war_point(game.tournament_prize) if game.game_type['tournament'] == 'tournament' && @war.tournament_effort == true
  end

  def war_point(points)
    if @side_from
      @war.increment!(:from_score, points)
    else
      @war.increment!(:on_score, points)
    end
  end

  def set_war
    w_guild = @winner.guild_member&.guild
    l_guild = @looser.guild_member&.guild
    return unless w_guild && l_guild

    @side_from = true if (@war = War.where(from: w_guild, on: l_guild).first)
    @war ||= War.where(from: l_guild, on: w_guild).first
    @war
  end
end
