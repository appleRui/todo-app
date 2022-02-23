import Vue from 'vue'
import VueRouter from 'vue-router'
// import { authGuard } from './authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'TheLogin',
    component: () => import('@/views/auth/TheLogin')
  },
  {
    path: '/',
    // beforeEnter: authGuard,
    name: 'TheHome',
    component: () => import('@/views/TheHome')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
