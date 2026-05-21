<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import FormTask from '@/components/FormTask.vue'

import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@/components/dataTable/types'

defineProps<{
  columns: ColumnDef<User>[]
  data: User[]
  currentPage: number
  lastPage: number
  pageSize: number
  totalData: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'task-created'): void
}>()

const priorityOptions = [
  { label: 'High', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Low', value: 3 },
]

function onStatusChange(row: User, value: boolean) {
  row.completed = value

  // Call API update here.
}
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] space-y-6 bg-zinc-50 p-8 text-zinc-950">
    <Alert
      title="Dashboard ready"
      description="Your task data is loaded and ready to review."
      variant="success"
      dismissible
    />

    <FormTask @task-created="emit('task-created')" />

    <DataTable
      :columns="columns"
      :data="data"
      filter-column-id="priority"
      filter-placeholder="All priorities"
      :filter-options="priorityOptions"
      :current-page="currentPage"
      :last-page="lastPage"
      :page-size="pageSize"
      :total-data="totalData"
      :loading="loading"
      @status-change="onStatusChange"
      @page-change="emit('page-change', $event)"
    />
  </main>
</template>
