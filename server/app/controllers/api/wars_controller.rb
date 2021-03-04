# frozen_string_literal: true

module Api
  class WarsController < ApiController
    before_action :set_war, only: %i[show update]
    before_action :set_from, only: %i[create war_params_create]

    UserReducer = Rack::Reducer.new(War.all, ->(guild_id:) { where(guild_id: guild_id) })

    def index
      wars = UserReducer.apply(params)
      json_response(wars)
    end

    def create
      return unless @from.officers.where(user_id: current_user.id)

      war = War.create!(war_params_create)
      json_response(war, :created)
    end

    def update
      return unless @from.owner == current_user

      @war.update!(war_params)
      json_response(@war)
    end

    def show
      json_response(@war)
    end

    private

    def war_params_create
      params.permit(:from, :on, :war_start, :war_end, :prize, :max_unanswered).merge!(guild_id: @from.id)
    end

    def set_war
      @war = War.find(params[:id])
    end

    def set_from
      @from = Guild.find(params[:from])
    end
  end
end
