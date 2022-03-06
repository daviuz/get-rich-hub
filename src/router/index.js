import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const otherRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'Default',
      title: "Login | Passive Traders"
    }
  }
]

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'AuthedLayout',
      requiresAuth: true,
      title: "Home | Passive Traders",
      icon: 'House'
    }
  },
  {
    path: '/bots',
    name: 'Bots',
    component: () => import('@/views/Bots.vue'),
    meta: {
      layout: 'AuthedLayout',
      requiresAuth: true,
      title: "Bots | Passive Traders",
      icon: 'Cpu'
    }
  },
  {
    path: '/deals',
    name: 'Deals',
    component: () => import('@/views/Deals.vue'),
    meta: {
      layout: 'AuthedLayout',
      requiresAuth: true,
      title: "Deals | Passive Traders",
      icon: 'Money'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes.concat(otherRoutes)
})

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  const currentUser =  await store.dispatch('auth/fetchSessionState')
  NProgress.start()

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

router.afterEach(() => {
  NProgress.done()
})

export default router
