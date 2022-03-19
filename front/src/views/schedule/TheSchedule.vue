<style lang="scss" scoped>
.schedule {
  height: 85vh;
}
</style>

<template>
  <div class="schedule">
    <v-sheet tile height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-calendar
      ref="calendar"
      v-model="value"
      locale="ja-jp"
      :events="events"
      :event-color="getEventColor"
      @change="getEvents"
    ></v-calendar>
  </div>
</template>

<script>
import dayjs from 'dayjs'
const day = new dayjs()

export default {
  data() {
    return {
      events: [],
      value: day.format('YYYY-MM-DD')
    }
  },
  methods: {
    getEvents() {
      const events = [
        {
          name: '会議',
          start: new Date('2022-03-19T01:00:00'),
          end: new Date('2022-03-20T02:00:00'),
          color: 'blue',
          timed: true,
        },
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.value = day.format('YYYY-MM-DD')
    },
  },
  computed: {
    title() {
      return new dayjs(this.value).format('MM-YYYY')
    }
  }
}
</script>