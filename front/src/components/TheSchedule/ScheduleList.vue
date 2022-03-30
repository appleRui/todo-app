<style lang="scss" scoped>
</style>

<template>
  <div class="schedule-list">
    <v-card width="550">
      <v-card-title primary class="text-h6 grey lighten-2">
        カレンダーを選択
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-checkbox
            v-for="item in sheduleList"
            :key="item.id"
            v-model="selected"
            :label="item.summary"
            :value="item.id"
          ></v-checkbox>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close"> キャンセル </v-btn>
        <v-btn color="primary" text @click="getScheduleEvents"> 決定 </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import dialog from "@/store/modules/dialog"
import axios from '@/services/http'

export default ({
  data() {
    return {
      selected: [],
    }
  },
  created() {
    this.selected = this.$store.getters['schedule/selected']
  },
  methods: {
    close(){
      this.$store.commit('schedule/setSelected', this.selected)
      dialog.commit('close')
    },
    async getScheduleEvents(){
      this.$store.commit('schedule/setSelected', this.selected)
      await this.selected.forEach(async selectedId => {
        const { data } = await axios.get('/api/v1/schedules/events', {
          calendarId: selectedId
        })
        await this.$store.commit('schedule/setSchedule', data.items)
      });
      dialog.commit('close')
    }
  },
  computed: {
    sheduleList(){
      return  this.$store.getters['schedule/list']
    }
  }

})
</script>
