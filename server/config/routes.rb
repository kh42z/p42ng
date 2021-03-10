# frozen_string_literal: true

Rails.application.routes.draw do
  resources :two_factor
  namespace :api do
    resources :guilds do
      member do
        post 'members/:tid', to: 'guilds#create_members'
        delete 'members/:tid', to: 'guilds#destroy_members'
        post 'officers/:tid', to: 'guilds#create_officers'
        delete 'officers/:tid', to: 'guilds#destroy_officers'
      end
    end
    resources :wars
    resources :ladders
    resources :games
    resources :achievements
    resources :chats do
      member do
        post 'participants', to: 'chats#create_participant'
        delete 'participants', to: 'chats#destroy_participant'
        post 'mutes'
        post 'messages'
        post 'bans'
        post 'invites'
        post 'admins/:tid', to: 'chats#admins'
        delete 'admins/:tid', to: 'chats#admins'
      end
    end
    resources :users do
      member do
        post :avatar, to: 'users#upload_avatar'
        post 'ignores', to: 'users#create_ignore'
        delete 'ignores/:ignored_id', to: 'users#destroy_ignore'
        post 'friends', to: 'users#create_friendship'
        delete 'friends/:friend_id', to: 'users#destroy_friendship'
      end
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }
  mount Rswag::Ui::Engine, at: 'api-docs'
end

