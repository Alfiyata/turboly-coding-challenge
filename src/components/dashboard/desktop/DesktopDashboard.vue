<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import FormTask from '@/components/FormTask.vue'

import { ref } from 'vue'
import { columns } from '@/components/dataTable/columns'
import type { User } from '@/components/dataTable/types'


const priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const data = ref<User[]>([
  {
    id: 1,
    task: 'Create a new task management app',
    dueDate: '20/05/20226',
    priority: 'High',
    is_finished: false,
  },

  {
    id: 2,
    task: 'Design the user interface for the task management app',
    dueDate: '20/05/20226',
    priority: 'Medium',
    is_finished: true,
  },
])

function onStatusChange(row: User, value: boolean) {
  const task = data.value.find((item) => item.id === row.id)

  if (task) {
    task.is_finished = value
  }

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

    <FormTask />

    <DataTable
      :columns="columns"
      :data="data"
      filter-column-id="priority"
      filter-placeholder="All priorities"
      :filter-options="priorityOptions"
      @status-change="onStatusChange"
    />
  </main>
</template>
