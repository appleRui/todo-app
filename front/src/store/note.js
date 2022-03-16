// import remove from 'lodash/remove'

const state = {
  notes: [],
  remenberNote: {},
  openNote: {}
}

const getters = {
  notes(state) {
    return state.notes;
  },
  note(state) {
    return state.openNote;
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
  },
  setOpenNote(state, noteData) {
    state.openNote = noteData
  },
  resetOpenNote(state) {
    state.openNote = {}
  }
}

const actions = {
  setNotes({ commit }, paylaod) {
    commit('setNotes', paylaod)
  },
  removeNote({ commit }, id) {
    commit('removeNote', id)
  },
  setOpenNote({ commit }, noteData) {
    commit('setOpenNote', noteData)
  },
  resetOpenNote({ commit }) {
    commit('resetOpenNote')
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