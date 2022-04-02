<style lang="scss" scoped>
.v-navigation-drawer__content {
  background-color: #fafafa;
}
</style>

<template>
  <v-app>
    <router-view />
    <Loading />
  </v-app>
</template>

<script>
import Loading from "@/components/Modules/TheLoading.vue";

export default {
  name: 'App',
  data(){
    return {}
  },
  components: {
    Loading
  },
};
</script>