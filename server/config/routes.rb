# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :users, :ladders, :guilds
    resources :guilds do
      resources :guild_officers
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
  }
end
