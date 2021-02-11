# frozen_string_literal: true

Rails.application.routes.draw do
  get 'chat_admins/index'
  namespace :api do
    resources :users, :ladders, :guilds, :chats
    resources :states
    resources :guilds do
      resources :guild_officers
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
