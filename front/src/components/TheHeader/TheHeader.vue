<style lang="scss" scoped>
@import "./TheHeader";
</style>

<template>
  <v-app-bar app dense clipped-left elevation="1" color="primary">
      <v-app-bar-nav-icon @click="setDrawer = !setDrawer" color="white"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script>
import store from '@/store/index'

export default ({
  name: 'TheHeader',
  props: {
    drawer: {
      type: Boolean,
    }
  },
  data() {
    return {
      user: {
        name: store.state.user.name,
        email: store.state.user.email,
      },
    }
  },
  computed: {
    setDrawer: {
      get() {
        return this.drawer;
      },
      set(newVal) {
        return this.$emit("update:drawer", newVal);
      },
    },
  }
})
</script>
