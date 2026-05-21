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
    task: 'Create a new task management app',
    dueDate: '2023-10-15',
    priority: 'High',
    is_finished: false,
  },
  {
    id: 2,
    task: 'Design the user interface for the task management app',
    dueDate: '2023-10-20',
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
