<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    await router.push('/dashboard')
  } catch {
    errorMessage.value = 'Unable to sign in. Please check your email and password.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-sm ">
    <img
      src="@/assets/logo.png"
      alt="Login Illustration"
      class="mx-auto mb-8"
    />  
    <form
      class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-950">Login</h1>
        <p class="mt-2 text-sm text-gray-600">Sign in to continue to Turboly.</p>
      </div>
  
      <label class="mb-4 block">
        <span class="mb-2 block text-sm font-medium text-gray-700">Email</span>
        <input
          v-model="email"
          class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-200"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
      </label>
  
      <label class="mb-4 block">
        <span class="mb-2 block text-sm font-medium text-gray-700">Password</span>
        <input
          v-model="password"
          class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-200"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />
      </label>
  
      <p v-if="errorMessage" class="mb-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>
  
      <button
        class="w-full rounded-md bg-[#10b8e1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0fa8ce] disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
        type="submit"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Signing in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
