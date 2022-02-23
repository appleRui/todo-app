// *****************
// *** authGuard ***
// *****************

const authGuard = async (to, from, next) => {

  const sessionValue = sessionStorage.getItem('todo-app')

  if (!sessionValue) {
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