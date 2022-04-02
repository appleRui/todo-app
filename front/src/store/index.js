import Vue from 'vue'
import Vuex from 'vuex'
import note from '@/store/note'
import todo from '@/store/todo'
import schedule from '@/store/schedule'
import spinner from '@/store/modules/spinner'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    note,
    todo,
    schedule,
    spinner
  },
  state: {
    user: null,
    remenberRoute: {
      path: '/',
      name: 'TheHome'
    },
    isGoogleAuth: false
  },
  mutations: {
    setCurrentUser(state, paylaod) {
      state.user = paylaod
    },
    setRemenberRoute(state, to) {
      state.remenberRoute = to
    },
    setIsGoogleAuth(state, result) {
      state.isGoogleAuth = result
    }
  },
  actions: {
    setCurrentUser({ commit }, payload) {
      commit('setCurrentUser', payload)
    },
    setRemenberRoute({ commit }, to) {
      commit('setRemenberRoute', to)
    },
    setIsGoogleAuth({ commit }, result) {
      commit('setIsGoogleAuth', result)
    }
  },
})
