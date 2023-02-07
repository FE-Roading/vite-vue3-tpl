import { createRouter, createWebHashHistory } from 'vue-router'

import userRoutes from './modules/user'
import commonRoutes from './modules/common'

const routes = [
  ...userRoutes,
  ...commonRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
export {
  routes
}
