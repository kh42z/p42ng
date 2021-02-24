# frozen_string_literal: true

Rails.application.routes.draw do
  get 'chat_admins/index'
  namespace :api do
    resources :ladders
    resources :chats
    resources :games
    resources :chats
    resources :users do
      post :avatar, on: :member, to: 'users#upload_avatar'
    end
    resources :guilds do
      delete :destroy_officer
    end
#    resources :guilds do
#      member do
#        delete 'destroy_officer'
#        get 'war_records'
#      end
#    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }
  mount Rswag::Ui::Engine, at: 'api-docs'
end

