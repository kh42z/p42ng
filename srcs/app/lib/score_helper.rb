# frozen_string_literal: true

module ScoreHelper
  include(WarHelper)
  class GamePoints
    POINTS = 10

    def game_points(game)
      winner_side(game)
      @winner.guild&.increment!(:score, POINTS)
      ladder_points if game.mode['ladder'] == 'ladder'
      war_efforts(game) if set_war
    end

    private

    def war_points(war)
      if @winner.guild.id == war.from_id
        war.increment!(:from_score, POINTS)
      else
        war.increment!(:on_score, POINTS)
      end
    end

    def ladder_war_effort
      wars = @winner.guild&.wars&.where(ladder_effort: true)
      wars&.each { |war| war_points(war) }
    end

    def ladder_points
      @winner.increment!(:ladder_games_won)
      @looser.increment!(:ladder_games_lost)
      ladder_war_effort
    end

    def war_efforts(game)
      war_points(@war) if game.mode['duel'] == 'duel'
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
      w_guild = @winner.guild
      l_guild = @looser.guild
      return unless w_guild && l_guild

      @war = war_opened_side_help(w_guild, l_guild)
      @winner_is_from_side = w_guild.id == @war.from_id if @war.present?
      @war.present?
    end
  end
end
