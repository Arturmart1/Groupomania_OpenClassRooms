import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
