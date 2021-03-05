# frozen_string_literal: true

module Api
  class GuildsController < ApiController
    before_action :set_guild, only: %i[show update destroy update_officers members officers]

    def index
      json_response(Guild.all.order(score: :desc))
    end

    def update
      return render_not_allowed if @guild.owner != current_user

      @guild.update!(guild_params)
      update_officers
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
      return render_not_allowed unless current_user == @guild.owner || @guild.officers.where(user_id: current_user)

      add_members(@guild) if request.post?
      destroy_member(@guild) if request.delete?
      json_response(@guild)
    end

    def officers
      return render_not_allowed unless current_user == @guild.owner

      add_officers(@guild) if request.post?
      destroy_officers(@guild) if request.delete?
      json_response(@guild)
    end

    private

    def add_members(guild)
      members = params.fetch(:member_ids)
      members.each do |t|
        User.find(t).update!(guild_id: guild.id) unless User.find(t).guild
      end
    end

    def destroy_member(guild)
      member = params.fetch(:format)
      User.find(member).update!(guild: nil) if User.find(member).guild == guild
    end

    def add_officers(guild)
      officers = params.fetch(:officer_ids)
      officers.each do |t|
        GuildOfficer.create(user_id: t, guild_id: guild.id) if guild.members.find(t) || current_user == guild.owner
      end
    end

    def destroy_officers(guild)
      officer = params.fetch(:format)
      GuildOfficer.destroy_by(user: officer) if current_user == guild.owner && GuildOfficer.where(guild_id: guild)
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
      params.permit(:name, :anagram).merge!({ owner: current_user })
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
