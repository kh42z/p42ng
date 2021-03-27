# frozen_string_literal: true

require 'mini_magick'

module Api
  class UsersController < ApiController
    before_action :set_user,
                  only: %i[show update upload_avatar create_ignore destroy_ignore create_friendship destroy_friendship]
    after_action :verify_authorized, except: %i[index show]

    UserReducer = Rack::Reducer.new(
      User.all.order(id: :asc),
      ->(ladder_id:) { where(ladder_id: ladder_id) },
      ->(status:) { where(status: status) },
      ->(guild_id:) { joins(:guild_member).where(guild_members: { guild_id: guild_id }) }
    )

    def index
      @users = UserReducer.apply(params)
      json_response(@users)
    end

    def update
      authorize @user

      return render_not_allowed if banning? && @user.id == current_user.id

      ban_hammer if banning?

      @user.update!(user_params)
      json_response(@user)
    end

    def show
      json_response(@user)
    end

    def upload_avatar
      authorize @user
      return render_error('Malformed', 422) unless params.key?(:avatar)

      attach_avatar
      url = url_for(@user.avatar)
      json_response({ image_url: url })
    end

    def create_ignore
      authorize @user
      p = ignore_params
      UserIgnore.create!(user: @user, ignored_id: p[:ignored_id])
      json_response({ ignored_id: p[:ignored_id].to_i }, 201)
    end

    def destroy_ignore
      authorize @user
      id = params.fetch(:ignored_id)
      UserIgnore.where(ignored_id: id, user: @user).destroy_all
      head :no_content
    end

    def create_friendship
      authorize @user
      p = friendship_params
      Friendship.create!(user: @user, friend_id: p[:friend_id])
      json_response({ friend_id: p[:friend_id].to_i }, 201)
    end

    def destroy_friendship
      authorize @user
      friend_id = params.fetch(:friend_id)
      Friendship.where(user_id: current_user.id, friend_id: friend_id).destroy_all
      head :no_content
    end

    private

    def banning?
      user_params.key?(:banned) && user_params[:banned]
    end

    def ban_hammer
      @user.tokens = nil
      disconnect_banned_user(@user.id)
    end

    def ignore_params
      params.permit(:ignored_id)
    end

    def friendship_params
      params.permit(:friend_id)
    end

    def user_params
      params.require(:user).permit(policy(@user).permitted_attributes)
    end

    def set_user
      @user = User.find(params[:id])
    end

    def attach_avatar
      mini_image = MiniMagick::Image.new(params[:avatar].tempfile.path)
      mini_image.resize '1200x1200'
      @user.avatar.attach(params[:avatar])
    end
  end
end
