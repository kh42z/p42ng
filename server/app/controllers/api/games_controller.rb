# frozen_string_literal: true

module Api
  class GamesController < ApiController
    before_action :set_game, only: %i[destroy]

    GameReducer = Rack::Reducer.new(
      Game.all,
      ->(user_id:) { Game.where(player_left: user_id).or(Game.where(player_right: user_id)) },
      ->(game_type:) { where(game_type: game_type) }
    )

    def index
      @games = GameReducer.apply(params)
      json_response(@games)
    end

    def create
      @games_params = params.permit(:game_type)
      if @games_params[:game_type] == 'duel'
        raise ActiveRecord::RecordInvalid if params.key?(:opponent_id) == false

        @games_params[:player_left_id], @games_params[:player_right_id] = [current_user.id,
                                                                           params[:opponent_id].to_i].shuffle
      end
      json_response(create_game)
    end

    def destroy
      return render_error('gameAlreadyStarted') if @game.state > 1

      @game.destroy
      head :no_content
    end

    protected

    def send_invites(game)
      invite(game.player_left.id, game.id)
      invite(game.player_right.id, game.id)
    end

    def invite(user_id, game_id)
      ActionCable.server.broadcast("user_#{user_id}", { action: 'game_invitation', id: game_id })
    end

    def create_game
      # TODO: Custom Exception
      raise ActiveRecord::RecordInvalid if User.find(params['opponent_id']).status != 'online'

      game = Game.create!(@games_params)
      send_invites(game)
    end

    def set_game
      @game = Game.find(params[:id])
    end
  end
end
