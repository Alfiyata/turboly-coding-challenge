<script setup lang="ts">

import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ref } from 'vue'

const date = ref()
const priority = ref('')

const priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

</Script>

<template>
  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input placeholder="Name Task"
        class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none" />
      <VueDatePicker v-model="date" :teleport="true" :ui="{ menu: 'z-[999999]' }" />
      <Select v-model="priority" placeholder="Select priority" :options="priorityOptions"
        class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none" />
      <button class="bg-[#10b8e1] text-white px-2 rounded-md hover:bg-[#10b8e1] cursor-pointer">
        Add Task
      </button>
    </div>
  </div>
</template>