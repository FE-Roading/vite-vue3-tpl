import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'
import Request from '@/views/request/index.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/request',
    name: 'Request',
    component: Request
  }
]

export default routes
