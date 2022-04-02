const state = {
  value: false,
}

const mutations = {
  loading(state) {
      state.value = true
    },
    close(state) {
      state.value = false
    }
}

const loading = {
  namespaced: true,
  state,
  mutations
}

export default loading