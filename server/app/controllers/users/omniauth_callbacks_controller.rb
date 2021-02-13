# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    def default_devise_mapping
      raise NotImplementedError('Marvin not found')
    end

    def assign_provider_attrs(user, auth_hash)
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
        config: @config,
        user_id: @resource.id
      }
      @auth_params.merge!(oauth_registration: true) if @oauth_registration
      @auth_params
    end
  end
end
