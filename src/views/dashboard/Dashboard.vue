<script setup lang="ts">
import { computed } from 'vue'
import { useDeviceType } from '@/composables/useDeviceType'

import MobileDashboard from '@/components/dashboard/mobile/MobileDashboard.vue'
import TabletDashboard from '@/components/dashboard/tablet/TabletDashboard.vue'
import DesktopDashboard from '@/components/dashboard/desktop/DesktopDashboard.vue'

const { device } = useDeviceType()

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
  <component :is="dashboardComponent" />
</template>
