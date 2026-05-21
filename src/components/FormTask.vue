<script setup lang="ts">

import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { taskService } from '@/services/task.service'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ref } from 'vue'
import type { User } from '@/components/dataTable/types'
import Swal from 'sweetalert2'

const emit = defineEmits<{
  (e: 'task-created', payload: User): void
}>()

const title = ref('')
const date = ref<Date | null>(null)
const priority = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const priorityOptions = [
  { label: 'High', value: '1' },
  { label: 'Medium', value: '2' },
  { label: 'Low', value: '3' },
]

function formatDate(value: Date) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  const hours = String(value.getHours()).padStart(2, '0')
  const minutes = String(value.getMinutes()).padStart(2, '0')
  const seconds = String(value.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

async function handleSubmit() {
  if (!title.value || !date.value || !priority.value) {
    errorMessage.value = 'Please complete all task fields.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const createdTask = await taskService.create({
      title: title.value,
      due_date: formatDate(date.value),
      priority: priority.value,
      status: "todo",
    })

    emit('task-created', createdTask)

    await Swal.fire({
      icon: 'success',
      title: 'Task created',
      text: 'Your task has been added successfully.',
      confirmButtonColor: '#10b8e1',
    })

    title.value = ''
    date.value = null
    priority.value = ''
  } catch {
    errorMessage.value = 'Failed to add task. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input v-model="title" placeholder="Name Task"
        class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none" />
      <VueDatePicker v-model="date" :teleport="true" :ui="{ menu: 'z-[999999]' }" />
      <Select v-model="priority" placeholder="Select priority" :options="priorityOptions"
        class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none" />
      <button
        type="submit"
        :disabled="isSubmitting"
        class="bg-[#10b8e1] text-white px-2 rounded-md hover:bg-[#10b8e1] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
      >
        {{ isSubmitting ? 'Adding...' : 'Add Task' }}
      </button>
    </div>

    <p v-if="errorMessage" class="mt-3 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </form>
</template>
