const state = {
  schedules: [],
}

const getters = {
  schedules(state) {
    return state.schedules;
  },
}

const mutations = {
  setSchedule(state, paylaod) {
    paylaod.forEach(element => {
      state.schedules.push(element)
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