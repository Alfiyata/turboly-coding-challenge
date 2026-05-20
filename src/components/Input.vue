<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { HTMLAttributes, InputHTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  type?: InputHTMLAttributes["type"]
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const inputValue = ref<string | number>(props.modelValue ?? props.defaultValue ?? "")

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) {
      inputValue.value = value
    }
  },
)

const inputType = computed(() => props.type ?? "text")

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emits("update:modelValue", target.value)
}
</script>

<template>
  <input
    v-bind="$attrs"
    data-slot="input"
    :type="inputType"
    :value="inputValue"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
    @input="onInput"
  >
</template>
