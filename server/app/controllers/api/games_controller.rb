# frozen_string_literal: true

module Api
  class GamesController < ApiController
    GameRecordReducer = Rack::Reducer.new(
      GameRecord.all,
      ->(user_id:) { GameRecord.where(winner_id: user_id).or(GameRecord.where(looser_id: user_id)) },
      ->(game_type_id:) { where(game_type_id: game_type_id) }
    )

    def index
      @games = GameRecordReducer.apply(params)
      json_response(@games)
    end
  end
end
