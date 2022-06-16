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
      resources :todos
      resources :notes
      resources :schedules, only: [:index]
      get 'schedules/isauth', action: :isauth, controller: 'schedules'
      get 'schedules/events', action: :events, controller: 'schedules'
      post 'setToken', action: :create, controller: 'schedules'
      # login, logout
      resources :user_token, only: [:create] do
        delete :destroy, on: :collection
      end
    end
  end
end
