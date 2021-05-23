Rails.application.routes.draw do
  root "application#index"

  get "active_storage_blob_variant_url/:key", to: "application#active_storage_blob_variant_url"

  resources :sections, defaults: { format: :json }

  resources :users, only: [:create]
  get "register", to: "users#new", as: "new_user"

  resources :sessions, only: [:create]
  get "login", to: "sessions#new", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"

  defaults format: :json do
    post "project/save", to: "projects#update"

    post "pages", to: "pages#index"
    post "page", to: "pages#show"
    post "page/save", to: "pages#update"
    post "page/create", to: "pages#create"
  end
end
