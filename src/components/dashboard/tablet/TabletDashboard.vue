<script setup lang="ts">
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
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] space-y-5 bg-zinc-50 p-6 text-zinc-950">
    <h1 class="text-2xl font-semibold">Tablet Dashboard</h1>

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
      @page-change="emit('page-change', $event)"
    />
  </main>
</template>
