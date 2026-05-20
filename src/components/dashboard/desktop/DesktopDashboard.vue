<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'

import { ref } from 'vue'
import { columns } from '@/components/dataTable/columns'

const date = ref()
const priority = ref('')

const priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const data = [
  {
    id: 1,
    task: 'Alfiyata',
    dueDate: 'alfy@gmail.com',
    priority: 'High',
  },

  {
    id: 2,
    task: 'John',
    dueDate: 'john@gmail.com',
    priority: 'Medium',
  },
]
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] space-y-6 bg-zinc-50 p-8 text-zinc-950">
    <Alert title="Dashboard ready" description="Your task data is loaded and ready to review." variant="success"
      dismissible />

    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Search tasks..." class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none" />
        <VueDatePicker
          v-model="date"
          :teleport="true"
          :ui="{ menu: 'z-[999999]' }"
        />
        <Select
          v-model="priority"
          placeholder="Select priority"
          :options="priorityOptions"
          class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>
    </div>
    <DataTable :columns="columns" :data="data" />
  </main>
</template>
