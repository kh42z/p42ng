# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    def default_devise_mapping
      raise NotImplementedError('Marvin not found')
    end

    def assign_provider_attrs(user, auth_hash)
      return unless @resource.new_record?

      user.assign_attributes({
                               email: auth_hash['info']['email'],
                               nickname: auth_hash['info']['nickname'],
                               image_url: auth_hash['info']['image']
                             })
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
      @auth_params.merge!(oauth_registration: true) if @oauth_registration
      @auth_params
    end

    def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource

      if confirmable_enabled?
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end

      sign_in(:user, @resource, store: false, bypass: false)

      @resource.save!

      create_auth_params

      yield @resource if block_given?

      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
    end
  end
end
