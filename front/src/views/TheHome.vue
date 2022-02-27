<style lang="scss" scopped>
.the-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .v-data-table {
    min-width: 800px;
  }
}
</style>

<template>
  <div class="the-home">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn outlined text @click.prevent="logout"> ログアウト </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import store from '@/store/index';
import auth from '@/services/auth';

export default {
  name: "TheHome",
  data() {
    return {
      users: null
    }
  },
  created() {
    this.user = store.state.user
  },
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  },
  methods: {
    logout(){
      const result = confirm('ログアウトしますか？')
      if(result){
        auth.logout()
        this.$router.push('/login')
      }
    }
  },
}
</script>
