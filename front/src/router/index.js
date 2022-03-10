import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  authGuard
} from './authGuard'
import TodoList from '@/views/todo/TodoList'
import Root from '@/views/TheRoot.vue'
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
    name: 'TheRoot',
    component: Root,
    children: [
      {
        path: '/',
        redirect: 'todos'
      },
      {
        path: 'todos',
        component: () => import('@/views/todo/TodoList.vue')
      },
    ]
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