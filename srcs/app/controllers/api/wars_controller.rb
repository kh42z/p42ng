# frozen_string_literal: true

module Api
  class WarsController < ApiController
    before_action :set_war, except: %i[index create]
    before_action :owners_permission, only: %i[update create_times destroy_times]
    before_action :terms_accepted?, only: %i[update create_times destroy_times]

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
      return render_error('notNegotiated', 403) unless turn_to_negotiate?

      @war.toggle(:negotiation)
      @war.update!(params_update)
      json_response(@war)
    end

    def create_times
      return render_error('timeSlotEntangled', 403) if times_entangled?

      war_time = WarTime.create!(time_params_create)
      json_response(war_time, 201)
    end

    def destroy_times
      WarTime.find(params[:tid]).destroy!
      head :no_content
    end

    def show
      json_response(@war)
    end

    private

    def terms_accepted?
      terms_accepted_response if param_accept || @war.terms_accepted == true
    end

    def terms_accepted_response
      if @war.terms_accepted == false
        return render_error('timeSlotEntangled', 403) if wars_entangled?

        @war.toggle!(:terms_accepted)
        json_response(I18n.t('termsAccepted').to_json, 200)
      else
        render_error('termsAccepted', 403)
      end
    end

    def wars_entangled?
      (@from.wars + @on.wars).uniq.without(@war).each do |t|
        return true if @war.war_start.between?(t.war_start, t.war_end)
        return true if @war.war_end.between?(t.war_start, t.war_end)
      end
      false
    end

    def times_entangled?
      @war.war_times.each do |t|
        return true if time_params_create[:start].between?(t.start, t.end)
        return true if time_params_create[:end].between?(t.start, t.end)
      end
      false
    end

    def turn_to_negotiate?
      current_user == @from.owner ? @war.negotiation? : @war.negotiation == false
    end

    def owners_permission
      render_not_allowed unless current_user == @from.owner || current_user == @on.owner
    end

    def params_update
      params.permit(:war_start, :war_end, :prize, :max_unanswered, :ladder_effort, :tournament_effort)
    end

    def param_accept
      tmp = params.permit(:accept_terms)
      tmp[:accept_terms] == 'true'
    end

    def params_create
      attacker = Guild.find(GuildMember.where(user: current_user).first.guild_id)
      tmp = params.permit(:on, :war_start, :war_end, :prize, :max_unanswered)
      tmp.merge!(from: attacker.id, guild_id: attacker.id)
    end

    def time_params_create
      params.permit(:start, :end).merge!(war: @war)
    end

    def set_war
      @war = War.find(params[:id])
      @from = Guild.find(@war.from)
      @on = Guild.find(@war.on)
    end
  end
end
