import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Homepage.vue'), // set homepage as path '/'
    beforeEnter: (to, from, next) => {
      const isLoggedIn = !!localStorage.getItem('user')

      if (!isLoggedIn) {
        alert('Please login first!')
        next({ path: '/login' })
      }
      
      next()
    }
  }, 
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue') // LogIn screen after Homepage
  },
  {
    path: '/:project_id/:part_number',
    name: 'part_page',
    component: () => import('../views/PartPage.vue') // PartInformation Page
  },
  {
    path: '/:project_id',
    name: 'project_page',
    component: () => import('../views/ProjectPage.vue'), // ProjectInformation Page
    beforeEnter: (to, from, next) => {
      const isLoggedIn = !!localStorage.getItem('user')

      if (!isLoggedIn) {
        alert('Please login first!')
        next({ path: '/login' })
      }
      
      next()
    } 
  },
  {
    path: '/user/:employee_id/adminpanel',
    name: 'admin_panel',
    component: () => import('../views/AdminPanel.vue') // AdminPanel User
  },
  {
    path: '/user/:employee_id/userpage',
    name: 'username',
    component: () => import('../views/UserPage.vue') // AdminPanel User
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router