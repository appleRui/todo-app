// *****************
// *** authGuard ***
// *****************
import auth from '@/services/auth'
import axios from 'axios'
import store from '@/store/index'

const authGuard = async (to, from, next) => {

  if (auth.isAuthenticated()) {
    await axios.get('http://localhost:3000/api/v1/users/current_user', {
        withCredentials: true
      })
      .then((tokenUser) => {
        store.dispatch('setCurrentUser', tokenUser.data)
      })
      .catch(() => {
        console.error('Unauthorized')
        auth.removeStorage()
      })
  }

  if (!auth.isUserPresent()) {
    alert('ログインしていません')
    location.href = '/login'
    next(false)
    return
  }
  next()
}

export {
  authGuard
}