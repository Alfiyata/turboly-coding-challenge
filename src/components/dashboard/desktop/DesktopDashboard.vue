<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'

import { ref } from 'vue'
import { columns } from '@/components/dataTable/columns'
import type { User } from '@/components/dataTable/types'

const date = ref()
const priority = ref('')

const priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const data = ref<User[]>([
  {
    id: 1,
    task: 'Alfiyata',
    dueDate: '20/05/20226',
    priority: 'High',
    is_finished: false,
  },

  {
    id: 2,
    task: 'John',
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

    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Name Task"
          class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <VueDatePicker v-model="date" :teleport="true" :ui="{ menu: 'z-[999999]' }" />
        <Select
          v-model="priority"
          placeholder="Select priority"
          :options="priorityOptions"
          class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <button
          class="bg-[#10b8e1] text-white px-2 rounded-md hover:bg-[#10b8e1] cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </div>
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
