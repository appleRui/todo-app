<style lang="scss" scoped>
@import "./TheSchedule";
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
          <v-list-item v-if="!disabled" @click="RelationWithGoogleCalendar">
            <v-icon class="mr-2">mdi-google</v-icon>
            <v-list-item-title>Google Calenderと連携</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="disabled" @click="onGoogleCalendarDialog">
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
      @click:event="showEvent"
    >
      <template v-slot:day-body="{ date, week }">
        <div
          class="v-current-time"
          :class="{ first: date === week[0].date }"
          :style="{ top: nowY }"
        ></div>
      </template>
    </v-calendar>

    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
      left
    >
      <v-card color="grey lighten-4" min-width="320px" flat>
        <div class="card__innser">
          <div class="card__header"></div>
          <div class="card__content">
            <div class="card__wrap">
              <div class="icon-inner">
                <v-icon dense color="gray darken-2"> mdi-clock </v-icon>
              </div>
              <div class="detail">
                <h3 class="name">{{ selectedEvent.name }}</h3>
                <p class="datatime">
                  {{ selectedEvent.dateTime }}
                </p>
              </div>
            </div>
            <div v-if="selectedEvent.description" class="card__wrap">
              <div class="icon-inner">
                <v-icon dense color="gray darken-2"> mdi-message-text </v-icon>
              </div>
              <div class="detail">
                <p class="description" v-html="selectedEvent.description">
                </p>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-menu>

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
      selectedEvent: {},
      selectedElement: {},
      selectedOpen: false,
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
      dayFormat(start, end){
        const date = dayjs(start).format('MM月DD日')
        const startAt = dayjs(start).format('HH:mm')
        const endAt = dayjs(end).format('HH:mm')
        return date + ' ' + startAt + '~' + endAt
      },
      showEvent({ nativeEvent, event }) {
        console.log(event)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          this.selectedEvent.dateTime = this.dayFormat(event.start, event.end)
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
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
    disabled(){
      return this.$store.state.isGoogleAuth
    }
  }
}
</script>