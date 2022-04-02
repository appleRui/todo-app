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
            v-model="selected"
            :key="item.id"
            :label="item.summary"
            :value="item.id"
          ></v-checkbox>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close"> キャンセル </v-btn>
        <v-btn color="primary" text @click="getScheduleEvents(selected)"> 決定 </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import dialog from "@/store/modules/dialog"
import GoogleCalendar from "@/mixins/GoogleCalendar"
export default ({
  data() {
    return {
      selected: [],
    }
  },
  mixins: [ GoogleCalendar ],
  created() {
    this.selected = this.$store.getters['schedule/selected']
  },
  methods: {
    close(){
      this.selected = []
      dialog.commit('close')
    },
  },
  computed: {
    sheduleList(){
      return this.$store.getters['schedule/list']
    },
  }

})
</script>
