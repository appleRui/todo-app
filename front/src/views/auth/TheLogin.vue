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
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
    name: "TheLogin",
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
        console.log(this.user)
      }
    },
    computed: {
      disabled() {
        return !this.user.email || !this.user.password
      }
    }
}
</script>
