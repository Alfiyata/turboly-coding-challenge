import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  const user = ref<any>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    const response: any = await authService.login({
      email,
      password,
    })

    console.log("response", response);

    token.value = response.token
    user.value = response.user

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
  }

  function logout() {
    token.value = null
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
})
