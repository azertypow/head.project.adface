import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/app',
    name: 'App',
    component: () => import('../views/ApplicationRendering.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
