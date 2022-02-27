import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    remenberRoute: {
      path: '/',
      name: 'TheHome'
    }
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, paylaod) {
      state.user = paylaod
    },
    setRemenberRoute(state, to) {
      state.remenberRoute = to
    }
  },
  actions: {
    setCurrentUser({ commit }, payload) {
      commit('setCurrentUser', payload)
    },
    setRemenberRoute({ commit }, to) {
      commit('setRemenberRoute', to)
    }
  },
})
