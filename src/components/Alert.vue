<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, XCircle } from '@lucide/vue'

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    variant?: AlertVariant
    dismissible?: boolean
  }>(),
  {
    title: '',
    description: '',
    variant: 'default',
    dismissible: false,
  },
)

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)

const styles: Record<AlertVariant, string> = {
  default: 'border-zinc-200 bg-white text-zinc-950',
  info: 'border-blue-200 bg-blue-50 text-blue-950',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  warning: 'border-amber-200 bg-amber-50 text-amber-950',
  danger: 'border-red-200 bg-red-50 text-red-950',
}

const iconStyles: Record<AlertVariant, string> = {
  default: 'text-zinc-500',
  info: 'text-blue-600',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

const icons = {
  default: AlertCircle,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
}

const alertClasses = computed(() => styles[props.variant])
const iconClasses = computed(() => iconStyles[props.variant])
const Icon = computed(() => icons[props.variant])

function close() {
  isVisible.value = false
  emit('close')
}
</script>

<template>
  <div
    v-if="isVisible"
    :class="[
      'flex gap-3 rounded-lg border px-4 py-3 shadow-sm',
      alertClasses,
    ]"
    role="alert"
  >
    <component :is="Icon" :class="['mt-0.5 size-5 shrink-0', iconClasses]" aria-hidden="true" />

    <div class="min-w-0 flex-1">
      <p v-if="title || $slots.title" class="text-sm font-semibold leading-5">
        <slot name="title">{{ title }}</slot>
      </p>

      <div
        v-if="description || $slots.default"
        class="text-sm leading-5 opacity-85"
        :class="{ 'mt-1': title || $slots.title }"
      >
        <slot>{{ description }}</slot>
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-md opacity-70 hover:bg-black/5 hover:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-current"
      aria-label="Close alert"
      @click="close"
    >
      <X class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
