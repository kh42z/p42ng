# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :users, :ladders, :guilds
    resources :guilds do
      resources :guild_officers
    end
  end
end
