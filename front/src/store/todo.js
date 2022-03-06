import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    remenberTodo: {}
  },
  getters: {},
  mutations: {
    setTodos(state, paylaod) {
      state.todos = paylaod
    },
    setRemenberTodo(state, paylaod) {
      state.remenberTodo = paylaod
    },
    addTodo(state, paylaod) {
      state.todos.push(paylaod)
    }
  },
  actions: {},
})