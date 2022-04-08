import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  authGuard
} from './authGuard'
import Root from '@/views/TheRoot.vue'
import Login from '@/views/auth/TheLogin'
import NotFound from '@/views/notfound/NotFound.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/draft',
    beforeEnter: authGuard,
    component: () => import('@/views/note/TheDraft.vue')
  },
  {
    path: '/note/edit/:id',
    beforeEnter: authGuard,
    component: () => import('@/views/note/TheDraft.vue')
  },
  {
    path: '/',
    beforeEnter: authGuard,
    name: 'TheRoot',
    component: Root,
    children: [{
        path: '/',
        redirect: 'todos'
      },
      {
        path: '/note/:id',
        component: () => import('@/views/note/TheNote.vue')
      },
      {
        path: 'todos',
        component: () => import('@/views/todo/TodoList.vue')
      },
      {
        path: 'notes',
        component: () => import('@/views/note/NoteList.vue')
      },
      {
        path: 'draft',
        component: () => import('@/views/note/TheDraft.vue')
      },
      {
        path: 'schedule',
        component: () => import('@/views/schedule/TheSchedule.vue')
      },
    ]
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router