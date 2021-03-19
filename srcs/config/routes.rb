# frozen_string_literal: true

Rails.application.routes.draw do
  resources :two_factor
  namespace :api do
    resources :guilds do
      member do
        post 'invitations', to: 'guilds#create_invitation'
        delete 'invitations', to: 'guilds#refuse_invitation'
        post 'members', to: 'guilds#accept_invites'
        post 'members/:tid', to: 'guilds#create_members' # TODO: remove
        delete 'members/:tid', to: 'guilds#destroy_members'
        post 'officers/:tid', to: 'guilds#create_officers'
        delete 'officers/:tid', to: 'guilds#destroy_officers'
      end
    end
    resources :wars do
      member do
        post 'times', to: 'wars#create_times'
        delete 'times', to: 'wars#destroy_times'
        post 'agreements'
      end
    end
    resources :ladders
    resources :games
    resources :achievements
    resources :chats do
      resources :messages, only: %i[index create]
      member do
        post 'participants', to: 'chats#join'
        delete 'participants', to: 'chats#leave'
        delete 'participants/:tid', to: 'chats#kick'
        post 'mutes'
        post 'bans'
        post 'invites'
        post 'admins/:tid', to: 'chats#promote'
        delete 'admins/:tid', to: 'chats#demote'
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
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  mount Rswag::Ui::Engine, at: 'api-docs'
end
