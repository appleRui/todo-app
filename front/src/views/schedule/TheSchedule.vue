<style lang="scss" scoped>
.schedule {
  height: 85vh;
}
.type-select {
  max-width: 72px;
}
</style>

<template>
  <div class="schedule">
    <v-sheet tile height="7vh" class="d-flex align-center">
      <v-btn outlined class="mx-4" color="gray" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title class="mx-5">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        class="ma-2 type-select"
        v-model="type"
        :items="types"
        item-text="name"
        item-value="value"
        return-object
        dense
        outlined
        hide-details
      ></v-select>

      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn primary icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="RelationWithGoogleCalendar">
            <v-icon class="mr-2">mdi-google</v-icon>
            <v-list-item-title>Google Calenderと連携</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onClickList">
            <v-icon class="mr-2">mdi-google</v-icon>
            <v-list-item-title>カレンダーを選択</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-sheet>
    <v-calendar
      ref="calendar"
      v-model="value"
      locale="ja-jp"
      color="primary"
      :type="type.value"
      :events="schedules"
      :month-format="() => ''"
      :day-format='(timestamp) => new Date(timestamp.date).getDate()'
    ></v-calendar>
    <Dialog />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import GoogleCalendar from '@/mixins/GoogleCalendar'
import dialogStore from '@/store/modules/dialog'
import Dialog from '@/components/Modules/TheBaseDialog.vue'

const day = new dayjs()

export default {
  components: {
    Dialog
  },
  mixins: [ GoogleCalendar ],
  data() {
    return {
      value: day.format('YYYY-MM-DD'),
      type: {name: '月', value: 'month'},
      types: [{name: '月', value: 'month'}, {name: '週', value: 'week'}],
    }
  },
  methods: {
    setToday() {
      this.value = day.format('YYYY-MM-DD')
    },
    RelationWithGoogleCalendar(){
      this.handleClientLoad()
    },
    onClickList(){
      dialogStore.commit('open', 'ScheduleList')
    },
  },
  computed: {
    title() {
      return new dayjs(this.value).format('YYYY年 MM月')
    },
    schedules() {
      return  this.$store.getters['schedule/schedules']
    }
  }
}
</script>