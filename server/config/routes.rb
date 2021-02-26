# frozen_string_literal: true

Rails.application.routes.draw do
  resources :two_factor
  namespace :api do
    resources :ladders
    resources :games
    resources :chats do
      member do
        post 'participants'
        post 'mutes'
        # post 'bans'
      end
    end
    resources :users do
      post :avatar, on: :member, to: 'users#upload_avatar'
    end
    resources :guilds do
      delete :destroy_officer
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }
  mount Rswag::Ui::Engine, at: 'api-docs'
end

