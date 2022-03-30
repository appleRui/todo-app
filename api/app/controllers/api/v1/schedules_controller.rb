class Api::V1::SchedulesController < ApplicationController

  def index
    cookies[token] = {
      value: params[:code],
      secure: Rails.env.production?,
      http_only: true
    }
    http = GoogleCalendar::Client.new(code: params[:code])
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

end
