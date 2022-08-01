import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
