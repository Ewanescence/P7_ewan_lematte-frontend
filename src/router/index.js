import { createRouter, createWebHashHistory } from 'vue-router'

import Splashscreen from '@/views/Splashscreen.vue'
import Home from '@/views/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

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
  {path: '/home', component: Home},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
