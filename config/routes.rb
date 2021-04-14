Rails.application.routes.draw do
  root "application#index"

  resources :sections, defaults: { format: :json }

  resources :users, only: [:create]
  get "register", to: "users#new", as: "new_user"

  resources :sessions, only: [:create]
  get "login", to: "sessions#new", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"

  defaults format: :json do
    post "pages", to: "pages#index"
    post "page", to: "pages#show"
  end
end
