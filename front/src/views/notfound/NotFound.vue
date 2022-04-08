<style lang="scss" scoped>
.notfound {
  &__inner {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  &__header {
    margin-bottom: 1.5rem;
    .ttl {
      font-size: 4rem;
    }
    .sub-ttl {
      font-size: 1.5rem;
    }
  }
}
</style>

<template>
  <div class="notfound">
    <the-sidebar :drawer.sync="drawer" />
    <the-header :drawer.sync="drawer" />
    <v-main>
      <v-container>
        <div class="notfound__inner">
          <div class="notfound__header">
            <h1 class="ttl">404</h1>
            <h2 class="sub-ttl">ページが見つかりませんでした</h2>
          </div>
          <v-btn color="primary" to="/"> トップに戻る </v-btn>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue'

export default {
  data() {
    return {
      drawer: false,
    }
  },
  components: {
    TheHeader,
    TheSidebar,
  },
}
</script>