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
      :day-format="(timestamp) => new Date(timestamp.date).getDate()"
    ></v-calendar>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import GoogleCalendar from '@/mixins/GoogleCalendar'
const day = new dayjs()

export default {
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
    }
  },
  computed: {
    title() {
      return new dayjs(this.value).format('MM-YYYY')
    },
    schedules() {
      return  this.$store.getters['schedule/schedules']
    }
  }
}
</script>