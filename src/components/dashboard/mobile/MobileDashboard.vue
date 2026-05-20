<script setup lang="ts">
import DataTable from '@/components/dataTable/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@/components/dataTable/types'

defineProps<{
  columns: ColumnDef<User>[]
  data: User[]
}>()
</script>

<template>
  <main class="min-h-[calc(100vh-4rem)] bg-zinc-50 p-4 text-zinc-950">
    <h1 class="text-xl font-semibold">Mobile Dashboard</h1>
    <DataTable :columns="columns" :data="data" />
  </main>
</template>
