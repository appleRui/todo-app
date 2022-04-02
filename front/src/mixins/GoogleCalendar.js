import axios from '@/services/http'
import dialogStore from '@/store/modules/dialog'
import toastStore from '@/store/modules/toaster'
import dialog from '@/store/modules/dialog'
import get from 'lodash/get'

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
            const code = get(res.wc, 'access_token', null)
            const exp = get(res.wc, 'expires_at', null)
            await this.setToken({
              code: code,
              exp: exp
            })
            await this.onGoogleCalendarDialog
          })
      } else {
        toastStore.dispatch('getToast', {msg: '既に認証しています'})
      }
    },
    async setToken(data) {
      await axios.post('api/v1/setToken', {
        code: data.code,
        exp: data.exp
      })
    },
    async onGoogleCalendarDialog() {
      const { data } = await axios.get('/api/v1/schedules')
      const isError = get(data, 'error', false)
      if (!isError) {
        this.$store.commit('schedule/setScheduleList', data.items)
        dialogStore.commit('open', 'ScheduleList')
      } else {
        toastStore.dispatch('getToast', {
          msg: '認証していません'
        })
      }
    },
    async getScheduleEvents(calendarIds) {
      this.$store.commit('schedule/resetSchedules')
      this.$store.commit('schedule/setSelected', calendarIds)
      localStorage.setItem('calendar_ids', calendarIds)
      await calendarIds.forEach(async selectedId => {
        const {
          data
        } = await axios.get('/api/v1/schedules/events', {
          calendarId: selectedId
        })
        await this.$store.commit('schedule/setSchedule', {
          calendarId: selectedId,
          events: data.items
        })
      });
      dialog.commit('close')
    }
  },
}