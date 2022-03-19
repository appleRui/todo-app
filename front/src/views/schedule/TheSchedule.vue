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
      <v-toolbar-title>{{ title }}</v-toolbar-title>
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
    </v-sheet>
    <v-calendar
      ref="calendar"
      v-model="value"
      locale="ja-jp"
      color="primary"
      :type="type.value"
      :events="events"
      :day-format="(timestamp) => new Date(timestamp.date).getDate()"
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
      value: day.format('YYYY-MM-DD'),
      type: {name: '月', value: 'month'},
      types: [{name: '月', value: 'month'}, {name: '週', value: 'week'}],
    }
  },
  methods: {
    getEvents() {
      const events = [
        {
          name: '会議',
          start: new Date('2022-03-19T01:00:00'),
          end: new Date('2022-03-21T02:00:00'),
          color: 'blue',
          timed: true,
        },
      ];
      this.events = events;
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