class Api::V1::SchedulesController < ApplicationController

  
  def create
    cookie_token = {
      value: token_params['code'],
      expires: Time.at(token_params['exp'] / 1000),
      secure: Rails.env.production?,
      http_only: true
    }
    cookies[token] = cookie_token
    head(:ok)
  end

  def index
    http = GoogleCalendar::Client.new(code: cookies[token])
    res = http.get(url: '/calendar/v3/users/me/calendarList')
    render json: res
  end

  def events
    http = GoogleCalendar::Client.new(code: cookies[token])
    res = http.get(url: "/calendar/v3/calendars/#{params[:calendarId]}/events", params: {
      'maxResults': '300',
      'timeMin': Time.current.ago(3.month).iso8601,
      'showDeleted': false,
      'orderBy': 'startTime',
      'singleEvents': true
    })
    render json: res
  end

  def isauth
    result = cookies[token].present? ? true : false
    render json: result
  end

  private

  def token_params
    params.require(:params).permit(:code, :exp)
  end

end
