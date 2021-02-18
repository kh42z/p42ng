# frozen_string_literal: true

module Api
  class StatesController < ApiController
    before_action :set_state, only: [:show]
    def index
      @states = State.all
      json_response(@states)
    end

    def show
      json_response(@state)
    end

    private

    def set_state
      @state = State.find(params[:id])
    end
  end
end
