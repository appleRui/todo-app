import store from '@/store/index'
const storage = window.localStorage

class Auth{

  setStorage(exp) {
    storage.setItem('exp', exp * 1000)
  }

  // removeStorage() {
  //   for (const key of Object.values(keys)) {
  //     storage.removeItem(key)
  //   }
  // }

  getExpire() {
    return storage.getItem('exp')
  }

  isAuthenticated() {
    return new Date().getTime() < this.getExpire()
  }

  login({ exp, user }) {
    this.setStorage(exp, user)
    store.dispatch('setCurrentUser', user)
  }

  // logout() {
  //   this.$axios.$delete('/api/v1/user_token')
  //   this.removeStorage()
  //   this.store.dispatch('setCurrentUser', null)
  // }
}

export default new Auth