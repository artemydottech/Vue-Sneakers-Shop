import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoadStatus, Sneaker } from '@/types'
import { getSneakers } from '@/services/api/sneakers'
import { errorMessage } from '@/utils/error'
import { isOnSale } from '@/utils/catalogue-filters'

export const useCatalogueStore = defineStore('catalogue', () => {
  const items = ref<Sneaker[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<Nullable<string>>(null)

  const isLoading = computed(() => status.value === 'idle' || status.value === 'loading')

  const brands = computed(() =>
    [...new Set(items.value.map((item) => item.brand))].sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    )
  )

  const priceRange = computed(() => {
    const prices = items.value.map((item) => item.price)
    return prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null
  })

  const newArrivals = computed(() =>
    items.value.filter((item) => item.isNew).sort((a, b) => b.popularity - a.popularity)
  )

  const bestsellers = computed(() =>
    [...items.value].sort((a, b) => b.popularity - a.popularity).slice(0, 8)
  )

  const onSale = computed(() => items.value.filter(isOnSale))

  const byId = (id: number) => items.value.find((item) => item.id === id) ?? null

  const byIds = (ids: number[]) => ids.map(byId).filter((item): item is Sneaker => item !== null)

  const relatedTo = (sneaker: Sneaker, limit = 4) =>
    items.value
      .filter((item) => item.id !== sneaker.id)
      .map((item) => ({
        item,
        score:
          Number(item.category === sneaker.category) * 2 +
          Number(item.brand === sneaker.brand) +
          Number(Math.abs(item.price - sneaker.price) < 4000)
      }))
      .sort((a, b) => b.score - a.score || b.item.popularity - a.item.popularity)
      .slice(0, limit)
      .map(({ item }) => item)

  const load = async () => {
    if (status.value === 'loading') return

    status.value = 'loading'
    error.value = null

    try {
      items.value = await getSneakers()
      status.value = 'ready'
    } catch (loadError) {
      error.value = errorMessage(loadError, 'Не удалось загрузить каталог')
      status.value = 'error'
    }
  }

  return {
    items,
    status,
    error,
    isLoading,
    brands,
    priceRange,
    newArrivals,
    bestsellers,
    onSale,
    byId,
    byIds,
    relatedTo,
    load
  }
})
