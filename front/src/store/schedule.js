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
      const data = {
        id: event.id,
        calendarId: params.calendarId,
        description: get(event, 'description', null),
        name: event.summary,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        timed: true
      }
      state.schedules.push(data)
    });
  },
  resetSchedules(state) {
    state.schedules = []
  },
  setSelected(state, selectedId) {
    state.selected.push(selectedId)
  },
  resetSelected(state) {
    state.selected = []
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