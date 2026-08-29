import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'sneakers:favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref<number[]>(readJson<number[]>(STORAGE_KEY, []))

  const index = computed(() => new Set(ids.value))
  const count = computed(() => ids.value.length)

  const has = (id: number) => index.value.has(id)

  const toggle = (id: number) => {
    ids.value = has(id) ? ids.value.filter((item) => item !== id) : [...ids.value, id]
  }

  watch(ids, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return { ids, count, has, toggle }
})
