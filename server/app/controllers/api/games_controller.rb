# frozen_string_literal: true

module Api
  class GamesController < ApiController
    GameReducer = Rack::Reducer.new(
      Game.all,
      ->(user_id:) { Game.where(winner_id: user_id).or(Game.where(looser_id: user_id)) },
      ->(game_type_id:) { where(game_type_id: game_type_id) }
    )

    def index
      @games = GameReducer.apply(params)
      json_response(@games)
    end

    def create
      games_params = params.permit(:game_type_id)
      json_response(Game.create!(games_params))
    end
  end
end
