# frozen_string_literal: true

module Api
  # Users Controller
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user, only: %i[show update destroy]

    UserReducer = Rack::Reducer.new(
      User.all,
      ->(ladder_id:) { where(ladder_id: ladder_id) },
      ->(state_id:) { where(state_id: state_id) },
      ->(guild_id:) { where(guild_id: guild_id) }
    )

    def index
      @users = UserReducer.apply(params)
      json_response(@users)
    end

    def update
      @user.update(user_params)
      json_response(@user)
    end

    def show
      json_response(@user)
    end

    def destroy
      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.permit(:two_factor, :nickname, :first_login)
    end

    def set_user
      @user = User.find(params[:id])
    end
  end
end
