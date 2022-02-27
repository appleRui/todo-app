import store from '@/store/index'
import axios from 'axios'
const storage = window.localStorage

class Auth {

  setStorage(exp) {
    storage.setItem('exp', exp * 1000)
  }

  removeStorage() {
    storage.removeItem('exp')
  }

  getExpire() {
    return storage.getItem('exp')
  }

  isAuthenticated() {
    return new Date().getTime() < this.getExpire()
  }

  get user() {
    return store.state.user || {}
  }

  isUserPresent() {
    return ('id' in this.user)
  }

  get loggedIn() {
    return this.isAuthenticated() && this.isUserPresent()
  }


  login({
    exp,
    user
  }) {
    this.setStorage(exp, user)
    store.dispatch('setCurrentUser', user)
  }

  logout() {
    axios.delete('http://localhost:3000/api/v1/user_token')
    this.removeStorage()
    store.dispatch('setCurrentUser', null)
  }
}

export default new Auth