<style lang="scss" scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 4px 42px !important;
}
</style>

<template>
  <div id="root">
    <the-sidebar :drawer.sync="drawer" />
    <the-header :drawer.sync="drawer" />
    <v-main>
      <v-container>
        <router-view />
        <the-toaster />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue'
import TheToaster from '@/components/Modules/TheToaster.vue'
import GoogleCalendar from '@/mixins/GoogleCalendar'
import axios from '@/services/http'

export default ({
  name: 'TheRoot',
  components: {
    TheHeader,
    TheSidebar,
    TheToaster
  },
  mixins: [ GoogleCalendar ],
  async created() {
    try{
      const todos = await axios.get(`/api/v1/todos`)
      const notes = await axios.get(`/api/v1/notes`)
      const isGoogleLogged = await axios.get(`/api/v1/schedules/isauth`)
      this.$store.commit('todo/setTodos', todos.data.todos)
      this.$store.dispatch('note/setNotes', notes.data.notes)
      this.$store.dispatch('setIsGoogleAuth', isGoogleLogged.data)
      if(isGoogleLogged){
        const savedCalendarIds = localStorage.getItem('calendar_ids')
        const calendarIds = savedCalendarIds.split(',')
        this.getScheduleEvents(calendarIds)
      }
    }catch(e){
      console.error(e)
    }
  },
  data(){
    return {
      drawer: true,
      items: [
          { title: 'TODOリスト', icon: 'mdi-format-list-checks' },
          { title: 'ノート', icon: 'mdi-notebook' },
          { title: 'カレンダー', icon: 'mdi-calendar' },
        ],
    }
  },
})
</script>
