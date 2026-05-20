<script setup lang="ts">
import { ref, watch } from "vue"
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

type SelectValue = string | number

type SelectOption = {
  label: string
  value: SelectValue
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    defaultValue?: SelectValue
    modelValue?: SelectValue
    placeholder?: string
    options?: SelectOption[]
    class?: HTMLAttributes["class"]
  }>(),
  {
    options: () => [],
  },
)

const emits = defineEmits<{
  (e: "update:modelValue", payload: SelectValue): void
}>()

const selectedValue = ref<SelectValue>(props.modelValue ?? props.defaultValue ?? "")

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) {
      selectedValue.value = value
    }
  },
)

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  selectedValue.value = target.value
  emits("update:modelValue", target.value)
}
</script>

<template>
  <select
    v-bind="$attrs"
    data-slot="select"
    :value="selectedValue"
    :class="cn(
      'border-input bg-background h-9 w-full min-w-0 appearance-none rounded-md border px-3 py-1 pr-8 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
    @change="onChange"
  >
    <option v-if="placeholder" disabled value="">
      {{ placeholder }}
    </option>

    <slot>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>
