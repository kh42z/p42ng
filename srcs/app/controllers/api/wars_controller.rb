# frozen_string_literal: true

module Api
  class WarsController < ApiController
    before_action :set_war, only: %i[show update]
    before_action :set_from, only: %i[create war_params war_params_create]

    UserReducer = Rack::Reducer.new(War.all.order(war_end: :desc), ->(guild_id:) { where(guild_id: guild_id) })

    def index
      wars = UserReducer.apply(params)
      json_response(wars)
    end

    def create
      unless current_user == @from.owner || GuildMember.where(user_id: current_user, guild_id: @from.id,
                                                              rank: 'officer')[0]
        return render_not_allowed
      end

      war = War.create!(war_params_create)
      json_response(war, :created)
    end

    def update
      return unless current_user == Guild.find(@war.from).owner

      @war.update!(war_params)
      json_response(@war)
    end

    def show
      json_response(@war)
    end

    private

    def war_params
      params.permit(:on, :war_start, :war_end, :prize, :max_unanswered)
    end

    def war_params_create
      params.permit(:on, :war_start, :war_end, :prize, :max_unanswered).merge!(from: @from.id, guild_id: @from.id)
    end

    def set_war
      @war = War.find(params[:id])
    end

    def set_from
      @from = Guild.find(current_user.guild_id)
    end
  end
end
