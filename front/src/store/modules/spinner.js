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

const spinner = {
  namespaced: true,
  state,
  mutations
}

export default spinner