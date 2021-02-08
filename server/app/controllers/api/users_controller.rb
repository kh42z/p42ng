# frozen_string_literal: true

module Api
  # Users Controller
  class UsersController < ApplicationController
    before_action :set_user, only: %i[show update destroy]
    def index
      json_response(User.all)
    end

    #     def create
    #       user = User.create!(user_params)
    #       json_response(user, :created)
    #     end
    #
    #     def update
    #       @user.update(user_params)
    #       json_response(@user)
    #     end

    def show
      json_response(@user)
    end

    def destroy
      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.permit(:nickname)
    end

    def set_user
      @user = User.find(params[:id])
    end
  end
end
