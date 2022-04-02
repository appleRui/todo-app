<template>
  <v-overlay :value="setValue">
    <img
      style="width: 125px"
      :src="require('@/assets/svg/loading-icon.svg')"
      alt="loading"
    />
  </v-overlay>
</template>

<script>

export default {
  computed: {
    state() {
      return this.$store.state.spinner
    },
    setValue: {
      get () {
        return this.state.value
      },
      set () {
        return this.$store.commit('spinner/close')
      }
    },
  }
}
</script>