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
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      layout: 'Default',
      title: "Settings | Passive Traders"
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
      icon: 'fa-solid fa-home-lg-alt'
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
      icon: 'fa-solid fa-robot'
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
      icon: 'fa-solid fa-money-bill-wave'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History.vue'),
    meta: {
      layout: 'AuthedLayout',
      requiresAuth: true,
      title: "History | Passive Traders",
      icon: 'fa-solid fa-clock-rotate-left'
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
