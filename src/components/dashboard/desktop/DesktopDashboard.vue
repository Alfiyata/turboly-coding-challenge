<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import DataTable from '@/components/dataTable/DataTable.vue'
import { columns } from '@/components/dataTable/columns'

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
    <Alert
      title="Dashboard ready"
      description="Your task data is loaded and ready to review."
      variant="success"
      dismissible
    />

    <DataTable :columns="columns" :data="data" />
  </main>
</template>
