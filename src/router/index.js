import { createRouter, createWebHashHistory } from 'vue-router'

import Splashscreen from '@/views/Splashscreen.vue'
import Groupomania from '@/views/Groupomania.vue'
import Home from '@/components/home/Home.vue'
import Profile from '@/components/profile/Profile.vue'
import Login from '@/components/splashscreen/Login.vue'
import Register from '@/components/splashscreen/Register.vue'

const routes = [
  {
    path: '/', 
    component: Splashscreen, 
    children: [
    {
      path: '/', component: Login
    },
    {
      path: '/register', component: Register
    }
  ]
},
  {
    path: '/home', 
    component: Groupomania,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home', component: Home, name: 'home'
      },
      {
        path: '/:profile', component: Profile, props: true
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await fetch('http://localhost:3000/api/user', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (user.status != 200) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
