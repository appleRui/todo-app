<style lang="scss" scoped>
.v-list--nav {
  padding-left: 48px;
}
</style>

<template>
  <v-navigation-drawer
    v-model="setDrawer"
    width="305"
    style="background-color: #fafafa"
    app
    clipped
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :to="item.route"
        :key="item.title"
        link
      >
        <v-list-item-icon :to="item.route">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default({
  name: 'TheSidebar',
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      items: [
          { title: 'TODOリスト', icon: 'mdi-format-list-checks', route: 'todos' },
          // { title: 'ノート', icon: 'mdi-notebook' },
          // { title: 'カレンダー', icon: 'mdi-calendar' },
        ],
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
  },
})
</script>
