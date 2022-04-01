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
  setSchedule(state, events) {
    events.forEach(event => {
      const data = {
        name: event.summary,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        timed: true
      }
      state.schedules.push(data)
    });
  },
  setScheduleList(state, selectedIds) {
    state.list = []
    selectedIds.forEach(selectedId => {
      state.list.push(selectedId)
    });
  },
  setSelected(state, selecteds) {
    state.selected = []
    selecteds.forEach(selected => {
      state.selected.push(selected)
    });
  },
}
const actions = {}

const todo = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default todo