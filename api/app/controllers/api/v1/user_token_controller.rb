class Api::V1::UserTokenController < ApplicationController
  rescue_from UserAuth.not_found_exception_class, with: :not_found
  before_action :delete_cookie
  before_action :authenticate, only: [:create]

  # login
  def create
    # cookies[token_access_key] = cookie_token
    render json: {
      token: auth.token,
      refresh_token: refresh_token,
      exp: auth.payload[:exp],
      user: entity.my_json
    }
  end
  
  # logout
  def destroy
    head(:ok)
  end

  private

    def entity
      @entity ||= User.find_activated(auth_params[:email])
    end

    def auth_params
      params.require(:user_token).permit(:email, :password)
    end

    # トークンを発行する
    def auth
      @_auth ||= UserAuth::AuthToken.new(payload: { sub: entity.id })
    end

    # リフレッシュトークンの作成（ログイン時に書き換える）
    def refresh_token
      @_refresh_token ||= SecureRandom.urlsafe_base64
      entity.update(refresh_token: @_refresh_token)
      @_refresh_token
    end

    # クッキーに保存するトークン
    def cookie_token
      {
        value: auth.token,
        expires: Time.at(auth.payload[:exp]),
        secure: Rails.env.production?,
        http_only: true
      }
    end

    # ユーザーが存在するか認証を行う
    def authenticate
      unless entity.present? && entity.authenticate(auth_params[:password])
        raise UserAuth.not_found_exception_class
      end
    end

    # NotFoundエラー発生時にヘッダーレスポンスのみを返す
    # status => Rack::Utils::SYMBOL_TO_STATUS_CODE
    def not_found
      render status: 404, json: {status: 404, message: 'メールアドレス、パスワードのいずれかのログイン情報に誤りがあります'}
    end
end
