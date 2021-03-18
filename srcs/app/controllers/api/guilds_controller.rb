# frozen_string_literal: true

module Api
  class GuildsController < ApiController
    before_action :set_guild
    skip_before_action :set_guild, only: %i[index create guild_params manage_ownership]
    before_action :permission,
                  only: %i[create_members destroy_members create_officers destroy_officers create_invitation update]

    def index
      json_response(Guild.all.order(score: :desc))
    end

    def update
      @guild.update!(guild_params)
      json_response(@guild)
    end

    def create
      return render_error('hasGuildAlready', 403) if current_user.guild_member

      guild = Guild.create!(guild_params)
      GuildMember.create!(user: current_user, guild: guild, rank: 'owner')
      json_response(guild, 201)
    end

    def show
      json_response(@guild)
    end

    def create_members
      to_ret = GuildMember.create!(user_id: params.fetch(:tid), guild: @guild)
      json_response(to_ret, 201)
    end

    def destroy_members
      return if mutiny?

      owner_leaving_the_ship = true if current_user.id == params.fetch(:tid).to_i
      GuildMember.where(user_id: params[:tid], guild_id: @guild.id).destroy_all
      manage_ownership(@guild) if owner_leaving_the_ship
      head :no_content
    end

    def create_officers
      to_ret = GuildMember.where(user_id: params.fetch(:tid), guild: @guild).update(rank: 'officer').first
      json_response(to_ret, 201)
    end

    def destroy_officers
      GuildMember.where(user_id: params.fetch(:tid), guild: @guild).update(rank: 'member').first
      head :no_content
    end

    def accept_invites
      return unless guild_pending_invitation?(@guild.id, current_user.id)

      to_ret = GuildMember.create!(user: current_user, guild: @guild)
      guild_delete_invitation(@guild.id, current_user.id)
      json_response(to_ret, 201)
    end

    def refuse_invitation
      return unless guild_pending_invitation?(@guild.id, current_user.id)

      guild_delete_invitation(@guild.id, current_user.id)
      head :no_content
    end

    def create_invitation
      user_id = params.fetch(:user_id)
      return render_error('userOffline', 403) unless user_available?(user_id)

      guild_invite_user(@guild.id, user_id)
      ActionCable.server.broadcast("user_#{user_id}", { action: 'guild_invitation', id: @guild.id })
      json_response({ user_id: user_id.to_i }, 201)
    end

    private

    def mutiny?
      render_not_allowed if current_user.guild_member.officer? && @guild.owner.id == member.to_i
    end

    def permission
      render_not_allowed unless @guild.owner == current_user || current_user.guild_member&.officer?
    end

    def user_available?(user)
      User.find(user).status == 'online'
    end

    def manage_ownership(guild)
      guild.officers&.first&.owner!
      guild.members&.first&.owner!
      guild.destroy! if guild.members.empty?
    end

    def guild_params
      params.permit(:name, :anagram)
    end

    def set_guild
      @guild = Guild.find(params[:id])
    end
  end
end
