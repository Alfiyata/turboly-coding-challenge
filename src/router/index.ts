import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/Dashboard.vue'
import LoginPage from '@/views/auth/LoginPage.vue'

import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      guest: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return '/dashboard'
  }
})

export default router
