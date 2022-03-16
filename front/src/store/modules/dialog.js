import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: false,
    component: []
  },
  getters: {},
  mutations: {
    open(state, componentName) {
      state.component.push(componentName)
      state.dialog = true
    },
    close(state) {
      state.dialog = false
    }
  },
  actions: {},
})