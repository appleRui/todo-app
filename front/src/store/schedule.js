import get from 'lodash/get'

const state = {
  schedules: [],
  list: [],
  selected: []
}

const getters = {
  schedules(state) {
    return state.schedules;
  },
  list(state) {
    return state.list;
  },
  selected(state) {
    return state.selected;
  },
}

const mutations = {
  setSchedule(state, params) {
    params.events.forEach(event => {
      const summary = get(event, 'summary', 'タイトルなし')
      const description = get(event, 'description', null)
      const start = get(event, 'start.dateTime', event.start.date)
      const end = get(event, 'end.dateTime', event.end.date)
      const timed = start.length !== 10
      
      const data = {
        id: event.id,
        calendarId: params.calendarId,
        description: description,
        name: summary,
        start: new Date(start),
        end: new Date(end),
        timed: timed
      }
      state.schedules.push(data)
    });
  },
  resetSchedules(state) {
    state.schedules = []
  },
  setSelected(state, selectedIds) {
    state.selected = selectedIds
  },
  setScheduleList(state, selectedIds) {
    state.list = []
    selectedIds.forEach(selectedId => {
      state.list.push(selectedId)
    });
  },
}
const actions = {}

const schedule = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default schedule