// import remove from 'lodash/remove'

const state = {
  notes: [],
  remenberNote: {}
}

const getters = {
  notes(state) {
    return state.notes;
  }
};

const mutations = {
  setNotes(state, paylaod) {
    state.notes = paylaod
  },
  setRemenberNote(state, paylaod) {
    state.remenberNote = paylaod
  },
  removeNote(state, id) {
    state.notes.forEach((note, i) => {
      if (note.id === id) state.notes.splice(i, 1)
    });
  }
}

const actions = {
  setNotes({ commit }, paylaod) {
    commit('setNotes', paylaod)
  },
  removeNote({ commit }, id) {
    commit('removeNote', id)
  }
}

const note = {
  namespaced: true, 
  state,
  actions,
  getters,
  mutations
}

export default note