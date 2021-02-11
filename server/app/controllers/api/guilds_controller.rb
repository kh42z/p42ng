# frozen_string_literal: true

module Api
  class GuildsController < ApplicationController
    before_action :set_guild, only: %i[show update destroy]
    before_action :set_guilds, only: %i[index]

    def index
      json_response(@guilds)
    end

    def update
      @guild.update!(guild_params)
      json_response(@guild)
    end

    def create
      guild = Guild.new(guild_params)
      if guild.save
        json_response(guild, :created)
      else
        json_response(guild.errors, :unprocessable_entity)
      end
    end

    def destroy
      Guild.find(params[:id]).destroy!
      head :no_content
    end

    def show
      json_response(@guild)
    end

    private

    def guild_params
      params.require(:guild).permit(:name, :anagram)
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end

    def set_guilds
      @guilds = Guild.all
    end
  end
end
