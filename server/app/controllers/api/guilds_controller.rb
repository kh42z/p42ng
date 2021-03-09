# frozen_string_literal: true

module Api
  class GuildsController < ApiController
    before_action :set_guild, only: %i[show update destroy members officers]

    def index
      json_response(Guild.all.order(score: :desc))
    end

    def update
      return render_not_allowed if @guild.owner != current_user

      @guild.update!(guild_params)
      head :ok
    end

    def create
      return render_error('hasGuildAlready') if current_user.guild

      guild = Guild.create!(guild_params_create)
      current_user.update!(guild: guild)
      json_response(guild, 201)
    end

    def show
      json_response(@guild)
    end

    def members
      return render_not_allowed unless current_user == @guild.owner || @guild.officers.where(user_id: current_user)[0]

      status = add_members(@guild) if request.post?
      status = destroy_members(@guild) if request.delete?
      json_response('', status)
    end

    def officers
      return render_not_allowed unless current_user == @guild.owner

      status = add_officers(@guild) if request.post?
      status = destroy_officers(@guild) if request.delete?
      json_response('', status)
    end

    private

    def manage_ownership(guild)
      new_owner = GuildOfficer.where(guild_id: guild.id).pluck(:user_id)[0]
      GuildOfficer.where(guild_id: guild.id, user_id: new_owner).destroy_all if new_owner
      new_owner ||= guild.members.pluck(:id).first
      guild.update!(owner_id: new_owner) if new_owner
      guild.destroy! unless new_owner
    end

    def add_members(guild)
      member = params.fetch(:tid)
      User.find(member).update!(guild_id: guild.id) unless User.find(member).guild
      200
    end

    def destroy_members(guild)
      member = params.fetch(:tid)
      destroyed = User.find(member).update!(guild: nil) if User.find(member).guild == guild
      manage_ownership(guild) if current_user.id == member.to_i
      destroyed ? 204 : 422
    end

    def add_officers(guild)
      officer = params.fetch(:tid)
      GuildOfficer.create(user_id: officer, guild_id: guild.id) if guild.members.find(officer)
      200
    end

    def destroy_officers(guild)
      officer = params.fetch(:tid)
      GuildOfficer.destroy_by(user: officer) if User.where(guild_id: guild).find(officer)
      204
    end

    def guild_params
      params.permit(:name, :anagram)
    end

    def guild_params_create
      params.permit(:name, :anagram).merge!({ owner: current_user })
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
