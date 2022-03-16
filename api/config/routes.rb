Rails.application.routes.draw do
  # get 'notes/index'
  # get 'notes/create'
  # get 'notes/show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users do
        get :current_user, action: :show, on: :collection
      end
      resources :todos, only: [:index, :create, :update]
      resources :notes, only: [:index, :create, :destroy, :show]
      
      # login, logout
      resources :user_token, only: [:create] do
        delete :destroy, on: :collection
      end
    end
  end
end
