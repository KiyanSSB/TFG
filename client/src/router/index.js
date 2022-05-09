import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Tables from '../components/Tables.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import { auth } from '../../config/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { limitToLast } from 'firebase/firestore'




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
      component: Tables,
      beforeEnter: (to,from,next) => {
        const main = useStore()
      
        console.log(main.email)
        if(main.email==""){
          next({path:'/login'})
        }else{
          next()
        }
      }
      


    },
    {
      path : '/register',
      name: 'register',
      component: Register
    },
    {
      path : '/login',
      name: 'login',
      component: Login,

      beforeEnter: (to,from,next) => {
        const main = useStore()
        if(main.email != ""){
          return false
        }else{
          next()
        }

      }

    }
  ]
})




export default router
