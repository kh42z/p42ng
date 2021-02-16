# frozen_string_literal: true

Rails.application.routes.draw do
  get 'chat_admins/index'
  namespace :api do
    resources :ladders, :guilds, :chats
    resources :users do
      post :avatar, on: :member, to: 'users#upload_avatar'
    end
    resources :states
    resources :guilds do
      resources :guild_officers # only: [:index]
    end
    resources :chats do
      resources :chat_admins
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
  }
  mount Rswag::Ui::Engine, at: 'api-docs'
end
