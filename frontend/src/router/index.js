import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Homepage.vue') // set homepage as path '/'
  }, 
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue') // LogIn screen after Homepage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router