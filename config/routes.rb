Rails.application.routes.draw do
  root "application#index"

  resources :pages
  resources :sections, defaults: { format: :json }
end
