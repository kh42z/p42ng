class UsersController < ApplicationController

    def index
        @users = User.all
        json_response(@users)
    end

    def create
        user = User.create!(user_params)
        json_response(user, :created)
    end

    private
    def user_params
        params.permit(:nickname)
    end

    def set_user
        @user = User.find(params[:user_id])
    end
end
