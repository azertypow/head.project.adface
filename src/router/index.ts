import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
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
