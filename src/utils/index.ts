import { computed } from 'vue'

export const isDeviceMobile = computed(() => {
  return window.innerWidth <= 720
})
