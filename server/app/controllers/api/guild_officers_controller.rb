# frozen_string_literal: true

module Api
  class GuildOfficersController < ApplicationController
    before_action :set_officer, only: %i[destroy]
    def index
      json_response(GuildOfficer.where(guild_id: params[:guild_id]))
    end

    def update
      @officer = GuildOfficer.where(guild_id: params[:guild_id]).create!(guild_id: params[:guild_id],
                                                                         user_id: params[:id])
      json_response(@officer, :created)
    end

    def destroy
      @officer.destroy
      head :no_content
    end

    private

    def officer_params
      params.permit(:guild_id, :user_id)
    end

    def set_officer
      @officer = Guild.find(params[:guild_id]).guild_officers.find_by user_id: params[:id]
    end
  end
end
