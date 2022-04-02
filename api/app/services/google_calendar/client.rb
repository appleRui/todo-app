require 'faraday'
require 'faraday/net_http'
Faraday.default_adapter = :net_http

module GoogleCalendar
  class Client
    attr_reader :code
    
    def initialize(code: nil)
      @http = Faraday.new(
                url: 'https://content.googleapis.com',
                headers: {
                  'Content-Type' => 'application/json',
                  'Authorization' => "Bearer #{code}"
                }
              )
    end

    def get(url: '', params: {})
      res = @http.get(url, params)
      return res.body
    end

  end
end