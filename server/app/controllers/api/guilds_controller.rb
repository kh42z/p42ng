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
      return render_error('hasGuildAlready') unless current_user.guild_member.nil?

      guild = Guild.create!(guild_params_create)
      GuildMember.create!(user: current_user, guild: guild)
      json_response(guild, 201)
    end

    def show
      json_response(@guild)
    end

    def members
      return render_not_allowed unless current_user == @guild.owner || @guild.officers.where(user_id: current_user)[0]

      member = params.fetch(:tid)
      GuildMember.create!(user_id: member, guild: @guild) if request.post?
      destroy_members(@guild, member) if request.delete?
      head :ok
    end

    def officers
      return render_not_allowed unless current_user == @guild.owner

      add_officers(@guild) if request.post?
      destroy_officers(@guild) if request.delete?
      head :ok
    end

    private

    def manage_ownership(guild)
      new_owner = GuildOfficer.where(guild_id: guild.id).pluck(:user_id)[0]
      GuildOfficer.where(guild_id: guild.id, user_id: new_owner).destroy_all if new_owner
      new_owner ||= guild.members.pluck(:user_id).first
      guild.update!(owner_id: new_owner) if new_owner
      guild.destroy! unless new_owner
    end

    def destroy_members(guild, member)
      GuildMember.where(user_id: member, guild_id: guild.id).destroy_all
      manage_ownership(guild) if current_user.id == member.to_i
    end

    def add_officers(guild)
      officer = params.fetch(:tid)
      GuildOfficer.create!(user_id: officer, guild_id: guild.id)
    end

    def destroy_officers(guild)
      officer = params.fetch(:tid)
      GuildOfficer.where(user_id: officer, guild: guild).destroy_all
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
