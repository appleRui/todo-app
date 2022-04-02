<style lang="scss" scoped>
$list-padding: 8px;
@import "./TheHeader";
</style>

<template>
  <v-app-bar
    app
    dense
    clipped-left
    elevation="1"
    color="primary"
    class="px-10"
  >
    <v-app-bar-nav-icon
      @click="setDrawer = !setDrawer"
      color="white"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-menu bottom min-width="276" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar tile color="white" size="32">
            <span class="primary--text">{{ user.name.substr(0, 2) }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item @click.prevent="logout">
            <v-icon> mdi-logout </v-icon>
            <v-list-item-content>
              <v-list-item-title> ログアウト </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import store from '@/store/index'
import auth from '@/services/auth';

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
  methods: {
    logout(){
      this.$store.commit('loading/loading')
      auth.logout()
      setTimeout(() => {
        this.$store.commit('loading/close')
        this.$router.push('/login')
      }, 1500)
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
