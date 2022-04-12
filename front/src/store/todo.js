const state = {
  remenberTodo: {},
  setOpenTodo: 0
}

const getters = {
  remenberTodo(state) {
    return state.remenberTodo;
  },
  setOpenTodo(state) {
    return state.setOpenTodo;
  },
}

const mutations = {
  setRemenberTodo(state, paylaod) {
    state.remenberTodo = paylaod
  },
  setOpenTodo(state, paylaod) {
    state.setOpenTodo = paylaod
  },
  resetOpenTodo(state) {
    state.setOpenTodo = 0
  }
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