# frozen_string_literal: true

module Api
  class GuildsController < ApiController
    before_action :set_guild, only: %i[show update destroy]

    def index
      json_response(Guild.all.order(:score))
    end

    def update
      @guild.update!(guild_params)
      update_officers
      json_response(@guild)
    end

    def create
      return render_error('hasGuildAlready') if current_user.guild

      guild = Guild.new(guild_params)
      guild.score = 0
      guild.owner = current_user
      save_and_return(guild)
    end

    def save_and_return(obj)
      if obj.save
        create_officers(obj.id)
        current_user.guild = obj
        current_user.save
        json_response(obj, :created)
      else
        json_response(obj.errors, :unprocessable_entity)
      end
    end

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

    def show
      json_response(@guild)
    end

    private

    def guild_params
      params.permit(:name, :anagram, :owner_id)
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
