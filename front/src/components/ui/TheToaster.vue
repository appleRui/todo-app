<style lang="scss" scoped>
</style>

<template>
  <v-snackbar v-model="setSnackbar" top text :color="toast.color">
    {{ toast.msg }}
  </v-snackbar>
</template>

<script>
import store from '@/store/modules/toaster'

export default {
  computed: {
    toast () {
      return store.state.toast
    },
    setSnackbar: {
      get () {
        return !!this.toast.msg
      },
      set (val) {
        this.resetToast()
        return val
      }
    }
  },
  beforeDestroy () {
    this.resetToast()
  },
  methods: {
    resetToast () {
      return store.dispatch('getToast', { msg: null })
    }
  }
}
</script>
