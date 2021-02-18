# frozen_string_literal: true

module Api
  class GameRecordsController < ApiController
    GameRecordReducer = Rack::Reducer.new(
      GameRecord.all,
      ->(user_id:) { GameRecord.where(winner_id: user_id).or(GameRecord.where(looser_id: user_id)) },
      ->(type_id:) { where(type_id: type_id) }
    )

    def index
      @games = GameRecordReducer.apply(params)
      json_response(@games)
    end
  end
end
