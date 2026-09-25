import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { isIdList } from '@/utils/storage-guards'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'para:recently-viewed'
const LIMIT = 8

export const useRecentlyViewedStore = defineStore('recently-viewed', () => {
  const ids = ref<number[]>(readJson<number[]>(STORAGE_KEY, [], isIdList))

  const track = (sneakerId: number) => {
    ids.value = [sneakerId, ...ids.value.filter((id) => id !== sneakerId)].slice(0, LIMIT)
  }

  watch(ids, (value) => writeJson(STORAGE_KEY, value))

  return { ids, track }
})
