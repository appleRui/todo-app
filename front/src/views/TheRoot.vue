<style lang="scss" scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 4px 42px !important;
}
</style>

<template>
  <div id="root">
    <the-sidebar :drawer.sync="drawer" />
    <the-header :drawer.sync="drawer" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue'

export default ({
  name: 'TheRoot',
  components: {
    TheHeader,
    TheSidebar
  },
  data(){
    return {
      drawer: true,
      items: [
          { title: 'TODOリスト', icon: 'mdi-format-list-checks' },
          { title: 'ノート', icon: 'mdi-notebook' },
          { title: 'カレンダー', icon: 'mdi-calendar' },
        ],
    }
  },
})
</script>
