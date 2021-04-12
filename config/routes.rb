Rails.application.routes.draw do
  root "application#index"

  resources :pages
  resources :sections, defaults: { format: :json }

  resources :users, only: [:create]
  get "register", to: "users#new", as: "new_user"

  resources :sessions, only: [:create]
  get "login", to: "sessions#new", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"
end
