class ApplicationController < ActionController::API
  include ActionController::Cookies
  include UserAuth::Authenticator
  # include Http::Client
end
