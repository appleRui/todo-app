import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: {
      msg: null,
      color: 'error',
      timeout: 4000
    }
  },
  getters: {},
  mutations: {
    setToast(state, payload) {
      state.toast = payload
    }
  },
  actions: {
    getToast({
      commit
    }, toast) {
      toast.color = toast.color || 'error'
      toast.timeout = toast.timeout || 4000
      commit('setToast', toast)
    }
  },
})