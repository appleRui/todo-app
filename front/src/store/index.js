import Vue from 'vue'
import Vuex from 'vuex'
import note from '@/store/note'
import todo from '@/store/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    note,
    todo
  },
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
