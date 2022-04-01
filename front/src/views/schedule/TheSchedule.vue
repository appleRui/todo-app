<style lang="scss" scoped>
.schedule {
  height: 85vh;
}
.type-select {
  max-width: 72px;
}

.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
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
          <v-list-item v-if="!this.$store.state.isGoogleAuth" @click="RelationWithGoogleCalendar">
            <v-icon class="mr-2">mdi-google</v-icon>
            <v-list-item-title>Google Calenderと連携</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.isGoogleAuth" @click="onGoogleCalendarDialog">
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
      :day-format="(timestamp) => new Date(timestamp.date).getDate()"
    >
      <template v-slot:day-body="{ date, week }">
        <div
          class="v-current-time"
          :class="{ first: date === week[0].date }"
          :style="{ top: nowY }"
        ></div>
      </template>
    </v-calendar>
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
      ready: false,
      type: {name: '週', value: 'week'},
      types: [{name: '月', value: 'month'}, {name: '週', value: 'week'}],
    }
  },
  mounted() {
    this.ready = true
    this.scrollToTime()
    this.updateTime()
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
    getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)
        this.cal.scrollToTime(first);
      },
      updateTime () {
        setInterval(() => this.cal.updateTimes(), 60 * 1000)
      },
  },
  computed: {
    title() {
      return new dayjs(this.value).format('YYYY年 MM月')
    },
    schedules() {
      return  this.$store.getters['schedule/schedules']
    },
    cal() {
        return this.ready ? this.$refs.calendar : null
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
  }
}
</script>