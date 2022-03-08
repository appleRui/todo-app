// *****************
// *** authGuard ***
// *****************
import auth from '@/services/auth'
import axios from 'axios'
import store from '@/store/index'
import route from '@/router/index'
import toasterStore from '@/store/modules/toaster';
const storage = window.localStorage

const authGuard = async (to, from, next) => {

  if (auth.isAuthenticated()) {
    await axios.get('http://localhost:3000/api/v1/users/current_user', {
        headers: {
          'Authorization': storage.getItem('token')
        },
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
    store.dispatch('setRemenberRoute', to)
    toasterStore.dispatch('getToast', {
      msg: "ログインが必要です"
    })
    route.push('/login')
    // location.href = '/login'
    next(false)
    return
  }
  next()
}

export {
  authGuard
}