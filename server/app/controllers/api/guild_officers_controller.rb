# frozen_string_literal: true

module Api
  class GuildOfficersController < ApplicationController
    def index
      json_response(GuildOfficer.where(guild_id: params[:guild_id]))
    end
  end
end
