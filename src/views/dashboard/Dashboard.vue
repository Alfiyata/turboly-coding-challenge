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
import Swal from 'sweetalert2'

const { device } = useDeviceType()

const pageSize = 10
const data = ref<User[]>([])
const currentPage = ref(1)
const lastPage = ref(1)
const totalData = ref(0)
const isLoading = ref(false)
const incompleteTodayTaskCount = ref(0)
const titleFilter = ref('')
let titleFilterTimeout: number | undefined

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
      title: titleFilter.value || undefined,
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

function onTitleChange(title: string) {
  titleFilter.value = title

  if (titleFilterTimeout) {
    window.clearTimeout(titleFilterTimeout)
  }

  titleFilterTimeout = window.setTimeout(() => {
    fetchTasks(1)
  }, 400)
}

async function onTaskCreated() {
  await Promise.all([fetchTasks(1), fetchIncompleteTodayTasks()])
}

async function onStatusChange(row: User, value: boolean) {
  try {
    await taskService.updateCompleted(row.id, value)

    const task = data.value.find((item) => item.id === row.id)

    if (task) {
      task.completed = value
    }

    await fetchIncompleteTodayTasks()

    await Swal.fire({
      icon: 'success',
      title: 'Task updated',
      text: value ? 'Task marked as completed.' : 'Task marked as incomplete.',
      confirmButtonColor: '#10b8e1',
    })
  } catch {
    await fetchTasks(currentPage.value)

    await Swal.fire({
      icon: 'error',
      title: 'Update failed',
      text: 'Unable to update task status. Please try again.',
      confirmButtonColor: '#10b8e1',
    })
  }
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
    :title-filter="titleFilter"
    :alert-title="dashboardAlert.title"
    :alert-description="dashboardAlert.description"
    :alert-variant="dashboardAlert.variant"
    @page-change="onPageChange"
    @task-created="onTaskCreated"
    @status-change="onStatusChange"
    @title-change="onTitleChange"
  />
</template>
