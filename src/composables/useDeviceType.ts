import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX_WIDTH = 767
const TABLET_MAX_WIDTH = 1023

function getDeviceType(width: number): DeviceType {
  if (width <= MOBILE_MAX_WIDTH) {
    return 'mobile'
  }

  if (width <= TABLET_MAX_WIDTH) {
    return 'tablet'
  }

  return 'desktop'
}

export function useDeviceType() {
  const width = ref(typeof window === 'undefined' ? TABLET_MAX_WIDTH + 1 : window.innerWidth)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const device = computed(() => getDeviceType(width.value))
  const isMobile = computed(() => device.value === 'mobile')
  const isTablet = computed(() => device.value === 'tablet')
  const isDesktop = computed(() => device.value === 'desktop')

  return {
    device,
    width,
    isMobile,
    isTablet,
    isDesktop,
  }
}
