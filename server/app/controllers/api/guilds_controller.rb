# frozen_string_literal: true

module Api
  class GuildsController < ApplicationController
    before_action :set_guild, only: %i[show update destroy]

    def index
      json_response(Guild.all.order(:name))
    end

    def update
      @guild.update!(guild_params)
      update_officers
      json_response(@guild)
    end

    def create
      guild = Guild.new(guild_params)
      if guild.save
        create_officers(guild.id)
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

    def create_officers(id)
      return unless params.key?(:officer_ids)

      params[:officer_ids].each do |officer|
        GuildOfficer.create(user_id: officer, guild_id: id)
      end
    end

    def update_officers
      return unless params.key?(:officer_ids)

      Guild.find(params[:id]).guild_officers.destroy_all
      create_officers(params[:id])
    end

    def guild_params
      params.permit(:name, :anagram, :owner_id)
      # puts params.require(:guild).permit(%i[name anagram owner_id officer_ids]).inspect
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
