<style lang="scss" scoped>
.v-navigation-drawer__content {
  background-color: #fafafa;
}
</style>

<template>
  <v-app>
    <router-view />
    <Spinner />
  </v-app>
</template>

<script>
import Spinner from "@/components/Modules/TheSpinner.vue";

export default {
  name: 'App',
  data(){
    return {}
  },
  components: {
    Spinner
  },
};
</script>