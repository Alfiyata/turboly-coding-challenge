<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { User, X, Menu } from '@lucide/vue';

const navigation = [
  { name: 'Dashboard', to: '/dashboard' },
]

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

function closeMenus() {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
}

async function logout() {
  authStore.logout()
  closeMenus()
  await router.push('/login')
}
</script>

<template>
  <nav
    class="relative bg-white text-white shadow-sm after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
  >
    <div class="mx-auto w-full px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="relative inline-flex size-10 items-center justify-center rounded-md text-gray-300 hover:bg-white/10 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            :aria-expanded="isMobileMenuOpen"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <span v-if="!isMobileMenuOpen" class="text-2xl leading-none" aria-hidden="true"><Menu /></span>
            <span v-else class="text-2xl leading-none " aria-hidden="true"><X /></span>
          </button>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="block h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="relative ml-3">
            <button
              type="button"
              class="relative flex size-9 items-center justify-center rounded-full bg-[#3F3F3F] text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              :aria-expanded="isUserMenuOpen"
              @click="toggleUserMenu"
            >
              <span class="sr-only">Open user menu</span>
              <User class="h-5 w-5" aria-hidden="true" />
            </button>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#3F3F3F] py-1 outline -outline-offset-1 outline-white/10"
              >
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                  @click="logout"
                >
                  Sign out
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white"
          active-class="bg-gray-950 text-white"
          @click="closeMenus"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
