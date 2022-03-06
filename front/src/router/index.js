import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  authGuard
} from './authGuard'
import TodoList from '@/views/todo/TodoList'
import Home from '@/views/TheHome'
import Login from '@/views/auth/TheLogin'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    beforeEnter: authGuard,
    name: 'Home',
    component: Home
  },
  {
    path: '/todos',
    beforeEnter: authGuard,
    name: 'TodoList',
    component: TodoList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router