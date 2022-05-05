import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Tables from '../components/Tables.vue'
import Register from '../components/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables
    },
    {
      path : '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
