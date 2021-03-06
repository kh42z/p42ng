# frozen_string_literal: true

require 'mini_magick'

module Api
  class UsersController < ApiController
    before_action :set_user, only: %i[show update upload_avatar create_ignore destroy_ignore]
    before_action :allowed?, only: %i[update upload_avatar create_ignore destroy_ignore]

    UserReducer = Rack::Reducer.new(
      User.all,
      ->(ladder_id:) { where(ladder_id: ladder_id) },
      ->(status:) { where(status: status) },
      ->(guild_id:) { where(guild_id: guild_id) }
    )

    def index
      @users = UserReducer.apply(params)
      json_response(@users)
    end

    def update
      return render_not_allowed if user_params.key?(:banned) && current_user.admin? == false

      disconnect_banned_user(@user.id) if user_params.key?(:banned) && user_params.fetch(:banned) == true

      @user.update!(user_params)
      json_response(@user)
    end

    def show
      json_response(@user)
    end

    def upload_avatar
      return unless params.key?(:avatar)

      mini_image = MiniMagick::Image.new(params[:avatar].tempfile.path)
      mini_image.resize '1200x1200'

      @user.avatar.attach(params[:avatar])
      url = url_for(@user.avatar)
      @user.update(image_url: url)
      json_response({ image_url: url })
    end

    def create_ignore
      p = ignore_params
      json_response(UserIgnore.create!(user: @user, ignored_id: p[:ignored_id]))
    end

    def destroy_ignore
      id = params.fetch(:ignored_id)
      UserIgnore.where(ignored_id: id, user: @user).destroy_all
      head :no_content
    end

    private

    def allowed?
      return unless current_user.id != @user.id && current_user.admin? == false

      render_not_allowed
    end

    def ignore_params
      params.permit(:ignored_id)
    end

    def user_params
      params.require(:user).permit(:two_factor, :nickname, :first_login, :banned, :guild_id)
    end

    def set_user
      @user = User.find(params[:id])
    end
  end
end
