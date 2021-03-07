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
      json_response(@guild)
    end

    def create
      return render_error('hasGuildAlready') if current_user.guild

      guild = Guild.create!(guild_params_create)
      current_user.update!(guild: guild)
      json_response(guild, :created)
    end

    def show
      json_response(@guild)
    end

    def members
      return render_not_allowed unless current_user == @guild.owner || @guild.officers.where(user_id: current_user)[0]

      status = add_members(@guild) if request.post?
      status = destroy_member(@guild) if request.delete?
      json_response(@guild, status)
    end

    def officers
      return render_not_allowed unless current_user == @guild.owner

      status = add_officers(@guild) if request.post?
      status = destroy_officer(@guild) if request.delete?
      json_response(@guild, status)
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
      members = params.fetch(:member_ids)
      members.each do |t|
        raise HasGuildAlreadyError if User.find(t).guild

        User.find(t).update!(guild_id: guild.id)
      end
      200
    end

    def destroy_member(guild)
      member = params.fetch(:format)
      destroyed = User.find(member).update!(guild: nil) if User.find(member).guild == guild
      manage_ownership(guild) if current_user.id == member.to_i
      destroyed ? 204 : 422
    end

    def add_officers(guild)
      officers = params.fetch(:officer_ids)
      officers.each { |t| GuildOfficer.create(user_id: t, guild_id: guild.id) if guild.members.find(t) }
      200
    end

    def destroy_officer(guild)
      officer = params.fetch(:format)
      GuildOfficer.destroy_by(user: officer) if User.where(guild_id: guild).find(officer)
      204
    end

    def guild_params
      params.permit(:name, :anagram, :owner_id)
    end

    def guild_params_create
      params.permit(:name, :anagram).merge!({ owner: current_user })
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
