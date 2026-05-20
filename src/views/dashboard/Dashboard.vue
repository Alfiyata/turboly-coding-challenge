<script setup lang="ts">
import { computed } from 'vue'
import { columns } from '@/components/dataTable/columns'
import type { User } from '@/components/dataTable/types'
import { useDeviceType } from '@/composables/useDeviceType'

import MobileDashboard from '@/components/dashboard/mobile/MobileDashboard.vue'
import TabletDashboard from '@/components/dashboard/tablet/TabletDashboard.vue'
import DesktopDashboard from '@/components/dashboard/desktop/DesktopDashboard.vue'
import Navbar from '@/components/layout/Navbar.vue'

const { device } = useDeviceType()

const data: User[] = [
  {
    id: 1,
    task: 'Alfiyata',
    dueDate: 'alfy@gmail.com',
    priority: 'High',
    is_finished: false,
  },
  {
    id: 2,
    task: 'John',
    dueDate: 'john@gmail.com',
    priority: 'Medium',
    is_finished: true,
  },
]

const dashboardComponent = computed(() => {
  if (device.value === 'mobile') {
    return MobileDashboard
  }

  if (device.value === 'tablet') {
    return TabletDashboard
  }

  return DesktopDashboard
})
</script>

<template>
  <Navbar />
  <component :is="dashboardComponent" :columns="columns" :data="data" />
</template>
