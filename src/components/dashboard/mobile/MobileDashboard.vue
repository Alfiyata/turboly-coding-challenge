<script setup lang="ts">
import DataTable from '@/components/dataTable/DataTable.vue'
import FormTask from '@/components/FormTask.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@/components/dataTable/types'
import { ref, watch } from 'vue'

const props = defineProps<{
  columns: ColumnDef<User>[]
  data: User[]
}>()

const priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const tasks = ref<User[]>([...props.data])

watch(
  () => props.data,
  (data) => {
    tasks.value = [...data]
  },
)

function onTaskCreated(task: User) {
  tasks.value.unshift(task)
}
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] space-y-4 bg-zinc-50 p-4 text-zinc-950">
    <h1 class="text-xl font-semibold">Mobile Dashboard</h1>

    <FormTask @task-created="onTaskCreated" />

    <DataTable
      :columns="columns"
      :data="tasks"
      filter-column-id="priority"
      filter-placeholder="All priorities"
      :filter-options="priorityOptions"
    />
  </main>
</template>
