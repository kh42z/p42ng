# frozen_string_literal: true

module Api
  class WarsController < ApiController
    before_action :set_war, only: %i[update update show officer_permission?]

    UserReducer = Rack::Reducer.new(War.all.order(war_end: :desc), ->(guild_id:) { where(guild_id: guild_id) })

    def index
      wars = UserReducer.apply(params)
      json_response(wars)
    end

    def create
      return render_not_allowed unless Guild.find(params_create[:from]).owner == current_user

      war = War.create!(params_create)
      json_response(war, 201)
    end

    def update
      return unless owners?
      return terms_accepted_response if param_accept['accept_terms'] == 'true' || @war.terms_accepted == true
      return render_error('notNegotiated', 401) unless turn_to_negotiate?

      @war.toggle(:negotiation)
      @war.update!(params_update)
      json_response(@war)
    end

    def show
      json_response(@war)
    end

    private

    def terms_accepted_response
      if @war.terms_accepted == false
        return render_error('warsEntangled', 403) if war_entangled?

        @war.toggle!(:terms_accepted)
        json_response(I18n.t('termsAccepted').to_json, 200)
      else
        render_error('termsAccepted', 403)
      end
    end

    def war_entangled?
      (@from.wars + @on.wars).uniq.without(@war).each do |t|
        return true if @war.war_start.between?(t.war_start, t.war_end)
        return true if @war.war_end.between?(t.war_start, t.war_end)
      end
      false
    end

    def turn_to_negotiate?
      if current_user == @from.owner
        @war.negotiation?
      else
        @war.negotiation == false
      end
    end

    def from_owner?
      current_user == @from.owner
    end

    def owners?
      current_user == @from.owner || current_user == @on.owner
    end

    def officer_permission?
      @war.from.officers.include?(current_user.guild_member)
    end

    def params_update
      params.permit(:war_start, :war_end, :prize, :max_unanswered, :addon_ids)
    end

    def param_accept
      params.permit(:accept_terms)
    end

    def params_create
      attacker = Guild.find(GuildMember.where(user: current_user).first.guild_id)
      tmp = params.permit(:on, :war_start, :war_end, :prize, :max_unanswered)
      tmp.merge!(from: attacker.id, guild_id: attacker.id)
    end

    def set_war
      @war = War.find(params[:id])
      @from = Guild.find(@war.from)
      @on = Guild.find(@war.on)
    end
  end
end
