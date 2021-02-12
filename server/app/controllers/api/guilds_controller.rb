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
      params[:officer_ids].each do |officer|
        GuildOfficer.create(user_id: officer, guild_id: id)
      end
    end

    def update_officers
      return unless params[:officer_ids].present?

      Guild.find(params[:id]).guild_officers.destroy_all
      create_officers(params[:id])
    end

    def guild_params
      params.permit(:name, :anagram, :owner_id, :officer_ids)
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end

    def set_guilds
      @guilds = Guild.all
    end
  end
end
