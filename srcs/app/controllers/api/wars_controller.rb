# frozen_string_literal: true

module Api
  class WarsController < ApiController
    before_action :set_war, except: %i[index create]
    before_action :war_editable?, only: %i[update create_times destroy_times]
    after_action :verify_authorized, except: %i[index show]

    UserReducer = Rack::Reducer.new(War.all.order(war_end: :desc),
                                    ->(guild_id:) { where(from_id: guild_id).or(where(on_id: guild_id)) })

    def index
      wars = UserReducer.apply(params)
      json_response(wars)
    end

    def create
      war = War.new(params_create)
      authorize war
      war.last_negotiation = current_user.guild.id
      war.save!
      json_response(war, 201)
    end

    def update
      authorize @war
      return render_error('notNegotiated', 403) unless turn_to_negotiate?

      @war.update!(params_update)
      @war.update!(from_agreement: false, on_agreement: false)
      json_response(@war)
    end

    def agreements
      authorize @war
      return render_error('timeSlotEntangled', 403) if wars_entangled?

      if current_user.guild_member.guild_id == @from.id
        @war.update!(from_agreement: param_agreement)
      else
        @war.update!(on_agreement: param_agreement)
      end
      start_war(@war) if @war.from_agreement? && @war.on_agreement?
      json_response(@war, 201)
    end

    def create_times
      authorize @war
      return render_error('timeSlotEntangled', 403) if times_entangled?

      war_time = WarTime.create!(time_params_create)
      WarTimeOpenerJob.set(wait_until: war_time.start).perform_later(war_time)
      WarTimeCloserJob.set(wait_until: war_time.end).perform_later(war_time)
      json_response(war_time, 201)
    end

    def destroy_times
      authorize @war
      WarTime.find(params[:tid]).destroy!
      head :no_content
    end

    def show
      json_response(@war)
    end

    private

    def start_war(war)
      war.update!(terms_agreed: true)
      WarOpenerJob.set(wait_until: war.war_start).perform_later(war)
      WarCloserJob.set(wait_until: war.war_end).perform_later(war)
    end

    def war_editable?
      return unless @war.from_agreement? || @war.on_agreement?
      return render_error('warOngoing', 403) if @war.opened?
      return render_error('warClosed', 403) if @war.closed?

      render_error('pendingAgreement', 403) if @war.terms_agreed == false
      render_error('termsAccepted', 403) if @war.terms_agreed == true
    end

    def wars_entangled?
      (@from.wars + @on.wars).uniq.without(@war).filter { |i| i.terms_agreed == true }.each do |t|
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
      return false if @war.last_negotiation == current_user.guild.id

      @war.last_negotiation = current_user.guild.id
    end

    def params_update
      params.permit(:war_start, :war_end, :prize, :max_unanswered, :ladder_effort, :tournament_effort)
    end

    def param_agreement
      param = params.fetch(:agree_terms)
      param == 'true'
    end

    def params_create
      attacker = Guild.find(GuildMember.where(user: current_user).first.guild_id)
      tmp = params.permit(:on_id, :war_start, :war_end, :prize, :max_unanswered)
      tmp.merge!(from_id: attacker.id)
    end

    def time_params_create
      params.permit(:start, :end).merge!(war: @war)
    end

    def set_war
      @war = War.find(params[:id])
      @from = Guild.find(@war.from_id)
      @on = Guild.find(@war.on_id)
    end
  end
end
