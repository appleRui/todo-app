const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
const now = new Date()
const TwoMonthBeforeFromNow = now.setMonth(now.getMonth() - 2)

export default {
  /*--------------------------------------------------
    mounted
  -------------------------------------------------*/
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onreadystatechange = script.onload = function () {
      console.log('Loaded with gapi')
    }
    document.head.appendChild(script)
  },
  /*--------------------------------------------------
    methods
  --------------------------------------------------*/
  methods: {
    handleClientLoad() {
      gapi.load('client:auth2', this.initClient)
    },
    initClient() {
      gapi.client.init({
        apiKey: process.env.VUE_APP_API_KEY,
        clientId: process.env.VUE_APP_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date(TwoMonthBeforeFromNow)).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 300,
            'orderBy': 'startTime'
          })
            .then((response) => {
              var events = response.result.items
              var array = []
              events.forEach(element => {
                console.log(element)
                var summary = element.summary
                var start = element.start.dateTime
                var end = element.end.dateTime
                var event = {
                  name: summary,
                  start: new Date(start),
                  end: new Date(end),
                  color: 'primary',
                  timed: true
                }
                array.push(event)
              })
              this.$store.commit('schedule/setSchedule', array)
            })
        })
    },
  },
}