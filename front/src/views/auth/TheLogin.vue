<style lang="scss" scoped>
@import "./TheLogin";
</style>

<template>
  <div class="the-login">
    <div class="the-login__innter">
      <v-card width="400px" class="text-center">
        <v-card-title tag="h1" class="d-block"> ログイン </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="user.email"
              type="text"
              label="メールアドレス"
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              v-model="user.password"
              type="password"
              label="パスワード"
              prepend-icon="mdi-lock"
              append-icon="mdi-eye-off"
            />
            <v-card-actions>
              <v-btn
                block
                tile
                color="primary"
                :disabled="disabled"
                @click.prevent="login"
                >ログイン</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      <theToaster />
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '@/services/auth';
import store from '@/store/index';
import toasterStore from '@/store/modules/toaster';
import theToaster from '@/components/Modules/TheToaster.vue';

export default {
    name: "TheLogin",
    components: {
      theToaster
    },
    data() {
      return {
        user: {
          email: null,
          password: null,
        }
      }
    },
    methods: {
      login(){
        this.$store.commit('spinner/loading')
        axios.post('http://localhost:3000/api/v1/user_token', this.user, { withCredentials: true })
        .then((res) => {
          auth.login(res.data)
          this.$router.push(store.state.remenberRoute.path)
        })
        .catch((e) => {
          // console.error(e.response)
          // alert('ログインに失敗しました')
          toasterStore.dispatch('getToast', {msg: e.response.data.message})
        })
      this.$store.commit('spinner/close')
      }
    },
    computed: {
      disabled() {
        return !this.user.email || !this.user.password
      }
    }
}
</script>
