/* eslint-disable no-unused-vars */
import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isDeviceMobile = computed(() => {
    return window.innerWidth <= 720
  })

  return {
    isDeviceMobile
  }
})
