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
  alertTitle: string
  alertDescription: string
  alertVariant: 'success' | 'danger'
  titleFilter: string
  priorityFilter: string | number
  dueDateFilter: string
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'task-created'): void
  (e: 'status-change', row: User, value: boolean): void
  (e: 'title-change', title: string): void
  (e: 'priority-change', priority: string | number): void
  (e: 'due-date-change', dueDate: string): void
}>()

const priorityOptions = [
  { label: 'High', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Low', value: 3 },
]
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] space-y-4 bg-zinc-50 p-4 text-zinc-950">
    <h1 class="text-xl font-semibold">Mobile Dashboard</h1>

    <Alert
      :title="alertTitle"
      :description="alertDescription"
      :variant="alertVariant"
      dismissible
    />

    <FormTask @task-created="emit('task-created')" />

    <DataTable
      :columns="columns"
      :data="data"
      filter-column-id="priority"
      filter-placeholder="All priorities"
      :filter-options="priorityOptions"
      :filter-value="priorityFilter"
      :current-page="currentPage"
      :last-page="lastPage"
      :page-size="pageSize"
      :total-data="totalData"
      :loading="loading"
      :title-filter="titleFilter"
      :due-date-filter="dueDateFilter"
      @status-change="(row, value) => emit('status-change', row, value)"
      @page-change="emit('page-change', $event)"
      @title-change="emit('title-change', $event)"
      @filter-change="emit('priority-change', $event)"
      @due-date-change="emit('due-date-change', $event)"
    />
  </main>
</template>
