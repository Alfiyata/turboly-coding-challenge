<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { columns } from '@/components/dataTable/columns'
import type { User } from '@/components/dataTable/types'
import { useDeviceType } from '@/composables/useDeviceType'
import { taskService } from '@/services/task.service'

import MobileDashboard from '@/components/dashboard/mobile/MobileDashboard.vue'
import TabletDashboard from '@/components/dashboard/tablet/TabletDashboard.vue'
import DesktopDashboard from '@/components/dashboard/desktop/DesktopDashboard.vue'
import Navbar from '@/components/layout/Navbar.vue'

const { device } = useDeviceType()

const pageSize = 10
const data = ref<User[]>([])
const currentPage = ref(1)
const lastPage = ref(1)
const totalData = ref(0)
const isLoading = ref(false)
const incompleteTodayTaskCount = ref(0)

const dashboardAlert = computed(() => {
  const count = incompleteTodayTaskCount.value

  if (count > 0) {
    return {
      title: 'Task due today',
      description: `You have ${count} incomplete task${count > 1 ? 's' : ''} due today.`,
      variant: 'danger' as const,
    }
  } else {
    return {
      title: 'All caught up!',
      description: 'You have no incomplete tasks due today.',
      variant: 'success' as const,
    }
  }
})

const dashboardComponent = computed(() => {
  if (device.value === 'mobile') {
    return MobileDashboard
  }

  if (device.value === 'tablet') {
    return TabletDashboard
  }

  return DesktopDashboard
})

async function fetchTasks(page = currentPage.value) {
  isLoading.value = true

  try {
    const response = await taskService.getAll({
      page,
      pageSize,
    })

    data.value = response.data
    currentPage.value = response.current_page
    lastPage.value = response.last_page
    totalData.value = response.total_data
  } finally {
    isLoading.value = false
  }
}

async function fetchIncompleteTodayTasks() {
  const response = await taskService.getDueDateTasks()
  incompleteTodayTaskCount.value = response.total_data
}

async function onPageChange(page: number) {
  await fetchTasks(page)
}

async function onTaskCreated() {
  await Promise.all([fetchTasks(1), fetchIncompleteTodayTasks()])
}

onMounted(() => {
  Promise.all([fetchTasks(), fetchIncompleteTodayTasks()])
})
</script>

<template>
  <Navbar />
  <component
    :is="dashboardComponent"
    :columns="columns"
    :data="data"
    :current-page="currentPage"
    :last-page="lastPage"
    :page-size="pageSize"
    :total-data="totalData"
    :loading="isLoading"
    :alert-title="dashboardAlert.title"
    :alert-description="dashboardAlert.description"
    :alert-variant="dashboardAlert.variant"
    @page-change="onPageChange"
    @task-created="onTaskCreated"
  />
</template>
