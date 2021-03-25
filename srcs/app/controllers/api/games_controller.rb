# frozen_string_literal: true

module Api
  class GamesController < ApiController
    before_action :set_game, only: %i[destroy]
    include(WarHelper)

    GameReducer = Rack::Reducer.new(
      Game.all,
      ->(user_id:) { Game.where(player_left: user_id).or(Game.where(player_right: user_id)) },
      ->(status:) { where(status: status) },
      ->(mode:) { where(mode: mode) }
    )

    def index
      @games = GameReducer.apply(params)
      json_response(@games)
    end

    def create
      @games_params = params.permit(:mode)
      player_sides
      return render_error('warTimeMatchLimit', 403) if war_time_match_ongoing?
      return render_error('opponentNotAvailable', 403) unless opponent_available?

      json_response(create_game, 201)
    end

    def destroy
      return render_error('gameAlreadyStarted', 403) if @game.status != 'pending'

      @game.destroy
      head :no_content
    end

    protected

    def player_sides
      @games_params[:player_left_id] = current_user.id
      @games_params[:player_right_id] = params.fetch(:opponent_id).to_i
    end

    def war_time_match_ongoing?
      return unless @games_params[:mode] == 'war'

      @games_params = @games_params.merge(war_time_id: war_time.id) unless war_time.nil?

      Game.where(war_time_id: war_time.id).any?
    end

    def war_time
      war = war_opened_side_help(current_user.guild, User.find(params[:opponent_id]).guild)
      war.war_times.where(opened: true).first
    end

    def send_invites(game)
      invite(game.player_left.id, game.id)
      invite(game.player_right.id, game.id)
    end

    def invite(user_id, game_id)
      ActionCable.server.broadcast("user_#{user_id}",
                                   { action: 'game_invitation', id: game_id, sender_id: current_user.id })
    end

    def opponent_available?
      User.find(params['opponent_id']).status == 'online'
    end

    def create_game
      game = Game.create!(@games_params)
      send_invites(game)
      game
    end

    def set_game
      @game = Game.find(params[:id])
    end
  end
end
