import store from '@/store/index'
import axios from 'axios'
const storage = window.localStorage

class Auth {

  setStorage(authData) {
    storage.setItem('exp', authData.exp * 1000)
    storage.setItem('token', authData.token)
    storage.setItem('refresh_token', authData.refresh_token)
  }x

  removeStorage() {
    storage.removeItem('exp')
    storage.removeItem('token')
    storage.removeItem('refresh_token')
  }

  getExpire() {
    return storage.getItem('exp')
  }
  getRefreshToken() {
    return storage.getItem('refresh_token')
  }

  getToken() {
    return storage.getItem('token')
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


  login(authData) {
    this.setStorage(authData)
    store.dispatch('setCurrentUser', authData.user)
  }

  logout() {
    axios.delete('http://localhost:3000/api/v1/user_token')
    this.removeStorage()
    store.dispatch('setCurrentUser', null)
  }
}

export default new Auth