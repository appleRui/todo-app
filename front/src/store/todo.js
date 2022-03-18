const state = {
  todos: [],
  remenberTodo: {}
}

const getters = {
  todos(state) {
    return state.todos;
  },
  remenberTodo(state) {
    return state.remenberTodo;
  },
}

const mutations = {
  setTodos(state, paylaod) {
    state.todos = paylaod
  },
  setRemenberTodo(state, paylaod) {
    state.remenberTodo = paylaod
  },
  addTodo(state, paylaod) {
    state.todos.push(paylaod)
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