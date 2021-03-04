# frozen_string_literal: true

module Api
  class GuildsController < ApiController
    before_action :set_guild, only: %i[show update destroy update_officers wars war_params_create]

    def index
      json_response(Guild.all.order(:score))
    end

    def update
      return unless @guild.owner == current_user

      @guild.update!(guild_params)
      update_officers
      json_response(@guild)
    end

    def create
      return render_error('hasGuildAlready') if current_user.guild

      guild = Guild.create!(guild_params_create)
      add_officers(guild)
      current_user.update!(guild: guild)
      json_response(guild, :created)
    end

    def show
      json_response(@guild)
    end

    private

    def add_officers(guild)
      return unless params[:officer_ids]

      params[:officer_ids].each { |t| GuildOfficer.create!(user_id: t, guild_id: guild.id) }
    end

    def update_officers
      return unless params.key?(:officer_ids)

      @guild.officers.destroy_all
      add_officers(@guild)
    end

    def guild_params
      params.permit(:name, :anagram, :owner_id)
    end

    def guild_params_create
      filtered_params = params.permit(:name, :anagram)
      filtered_params.merge!({ owner: current_user })
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
