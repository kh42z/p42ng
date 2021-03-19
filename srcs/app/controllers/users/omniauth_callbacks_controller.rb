# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    include LetterAvatar::AvatarHelper

    def assign_provider_attrs(user, auth_hash)
      return unless @resource.new_record?

      attach_avatar(user, auth_hash)
      user.assign_attributes({
                               email: auth_hash['info']['email'],
                               nickname: auth_hash['info']['nickname'],
                               image_url: url_for(user.avatar)
                             })
    end

    def attach_avatar(user, auth_hash)
      LetterAvatar.generate(auth_hash['info']['nickname'], 200)
      user.avatar.attach(io: File.open(letter_avatar_for(auth_hash['info']['nickname'], 500)), filename: '500.png')
    end

    def set_random_password
      p = SecureRandom.urlsafe_base64(nil, false)
      @resource.two_factor_code = p
      @resource.password = p
      @resource.password_confirmation = p
    end

    def create_auth_params
      @auth_params = {
        auth_token: @token.token,
        client_id: @token.client,
        uid: @resource.uid,
        expiry: @token.expiry,
        user_id: @resource.id,
        first_login: @resource.first_login
      }
      @auth_params[:oauth_registration] = true if @oauth_registration
      @auth_params
    end

    def banned?
      return unless @resource.banned?

      render json: {
        errors: [I18n.t('banned')]
      }, status: 403
    end

    def handle_two_factor
      send_code(@resource)
      params = { two_factor: true, user_id: @resource.id }
      redirect_to DeviseTokenAuth::Url.generate(auth_origin_url, params.as_json)
    end

    def omniauth_success
      get_resource_from_auth_hash

      set_token_on_resource

      @resource.skip_confirmation! if confirmable_enabled?

      sign_in(:user, @resource, store: false, bypass: false)
      @resource.save!
      @resource.reload
      return if banned?
      return handle_two_factor if @resource.two_factor?

      create_auth_params

      yield @resource if block_given?

      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
    end

    private

    def send_code(user)
      code = 6.times.map { rand(10) }.join
      user.update!(two_factor_code: code)
      timer_job(user)
      TwoFactorMailer.with(user: user, code: code).reset_email.deliver_later
    end

    def timer_job(user)
      TwoFactorResetJob.set(wait: 300).perform_later(user)
    end
  end
end
