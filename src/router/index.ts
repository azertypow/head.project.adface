import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'App',
    component: () => import('../views/ApplicationRendering.vue')
  },
  {
    path: '/term',
    name: 'Term',
    component: () => import('../views/Term.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
