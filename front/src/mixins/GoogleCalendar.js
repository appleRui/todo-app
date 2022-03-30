import axios from '@/services/http'
import dialogStore from '@/store/modules/dialog'
import toastStore from '@/store/modules/toaster'

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly"

export default {

  mounted() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onreadystatechange = script.onload = function () {}
    document.head.appendChild(script)
  },

  methods: {
    async handleClientLoad() {
      gapi.load('client:auth2', this.initClient)
    },
    initClient() {
      gapi.client.init({
        apiKey: process.env.VUE_APP_API_KEY,
        clientId: process.env.VUE_APP_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signIn()
          .then(async (res) => {
            console.log(res.wc.access_token)
            await this.onGoogleCalendarDialog(res.wc.access_token)
          })
      } else {
        toastStore.dispatch('getToast', {msg: '既に認証しています'})
      }
    },
    async onGoogleCalendarDialog(code) {
      const {
        data
      } = await axios.get('/api/v1/schedules', {
        code: code
      })
      this.$store.commit('schedule/setScheduleList', data.items)
      dialogStore.commit('open', 'ScheduleList')
    }
  },
}