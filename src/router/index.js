import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'AppLayout',
      title: "Login | Passive Traders"
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      layout: 'AuthedLayout',
      requiresAuth: true,
      title: "Dashboard | Passive Traders"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const currentUser =  await store.dispatch('auth/fetchSessionState')

  if (to.path === '/login' && currentUser) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next('/login')
    return
  }

  next()
})

export default router
