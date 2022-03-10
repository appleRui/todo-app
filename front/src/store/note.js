import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    remenberNote: {}
  },
  getters: {},
  mutations: {
    setNotes(state, paylaod) {
      state.notes = paylaod
    },
    setRemenberNote(state, paylaod) {
      state.remenberNote = paylaod
    },
    addNote(state, paylaod) {
      state.notes.push(paylaod)
    }
  },
  actions: {},
})