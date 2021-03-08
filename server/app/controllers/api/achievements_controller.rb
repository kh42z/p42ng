# frozen_string_literal: true

module Api
  class AchievementsController < ApiController
    AchievementReducer = Rack::Reducer.new(
      Achievement.all,
      ->(user_id:) { joins(:user_achievements).where(user_achievements: { user_id: user_id }) }
    )

    def index
      achievements = AchievementReducer.apply(params)
      json_response(achievements)
    end
  end
end
