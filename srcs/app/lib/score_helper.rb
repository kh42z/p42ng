# frozen_string_literal: true

module ScoreHelper
  include(WarHelper)
  POINTS = 10

  def game_point_assignment(game)
    winner_side(game)
    @winner.guild_member&.guild&.increment!(:score, POINTS)
    war_effort_point if set_war
    ladder_point unless game.mode['ladder'] == 'ladder'
  end

  def ladder_point
    @winner.increment!(:ladder_games_won)
    @looser.increment!(:ladder_games_lost)
  end

  def war_effort_point
    war_point(POINTS) if game.mode['duel'] == 'duel'
    war_point(POINTS) if game.mode['ladder'] == 'ladder' && @war.ladder_effort == true
    # war_point(game.tournament_prize) if game.mode['tournament'] == 'tournament' && @war.tournament_effort == true
  end

  def war_point(points)
    if @winner_is_from
      @war.increment!(:from_score, points)
    else
      @war.increment!(:on_score, points)
    end
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

  def set_war
    w_guild = @winner.guild_member&.guild
    l_guild = @looser.guild_member&.guild
    return unless w_guild && l_guild

    @war = war_opened_side_help(w_guild, l_guild)
    @winner_is_from = w_guild.id == @war.from_id if @war.present?
    @war.present?
  end
end
