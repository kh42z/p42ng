# frozen_string_literal: true

Rails.application.routes.draw do
  resources :two_factor
  namespace :api do
    resources :guilds
    resources :wars
    resources :ladders
    resources :games
    resources :chats do
      member do
        post 'participants', to: 'chats#create_participant'
        delete 'participants', to: 'chats#destroy_participant'
        post 'mutes'
        post 'bans'
        post 'invites'
      end
    end
    resources :users do
      member do
      post :avatar, to: 'users#upload_avatar'
      end
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }
  mount Rswag::Ui::Engine, at: 'api-docs'
end

