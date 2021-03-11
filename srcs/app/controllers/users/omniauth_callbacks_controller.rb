# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    include LetterAvatar::AvatarHelper

    def default_devise_mapping
      raise NotImplementedError('Marvin not found')
    end

    def assign_provider_attrs(user, auth_hash)
      return unless @resource.new_record?

      LetterAvatar.generate(auth_hash['info']['nickname'], 500)
      user.assign_attributes({
                               email: auth_hash['info']['email'],
                               nickname: auth_hash['info']['nickname'],
                               image_url: letter_avatar_url(auth_hash['info']['nickname'], 500)
                             })
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

      return handle_two_factor if @resource.two_factor?

      set_token_on_resource

      @resource.skip_confirmation! if confirmable_enabled?

      sign_in(:user, @resource, store: false, bypass: false)
      @resource.save!
      @resource.reload
      return if banned?

      create_auth_params

      yield @resource if block_given?

      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
    end

    private

    def send_code(user)
      send_mail(user)
      timer_job(user)
    end

    def send_mail(user)
      code = 6.times.map { rand(10) }.join
      mg_client = Mailgun::Client.new ENV['MAILGUN_SECRET']
      message_params = { from: 'no-reply@student.42.fr',
                         to: user.email,
                         subject: 'Pong: Your Code!',
                         text: "Enter this code: #{code}" }
      mg_client.send_message(ENV['MAILGUN_DOMAIN'], message_params)
      user.update!(two_factor_code: code)
    end

    def timer_job(user)
      TwoFactorResetJob.set(wait: 300).perform_later(user)
    end
  end
end
