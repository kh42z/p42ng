class Api::LaddersController < ApplicationController
  before_action :set_ladder, only: [:show]
  def index
    @ladders = Ladder.all
    json_response(@ladders)
  end

  def show
    json_response(@ladder)
  end

  private
  def set_ladder
      @user = User.find(params[:id])
    end
end
