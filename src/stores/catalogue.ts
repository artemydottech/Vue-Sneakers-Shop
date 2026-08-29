import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoadStatus, Sneaker, SortKey } from '@/types'
import { getSneakers } from '@/services/api/sneakers'

const comparators: Record<SortKey, (a: Sneaker, b: Sneaker) => number> = {
  popular: (a, b) => a.id - b.id,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  title: (a, b) => a.title.localeCompare(b.title, 'ru')
}

export const useCatalogueStore = defineStore('catalogue', () => {
  const items = ref<Sneaker[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<Nullable<string>>(null)
  const search = ref('')
  const sortBy = ref<SortKey>('popular')

  const isLoading = computed(() => status.value === 'loading')

  const visibleItems = computed(() => {
    const query = search.value.trim().toLowerCase()

    const filtered = query
      ? items.value.filter(
          (item) =>
            item.title.toLowerCase().includes(query) || item.brand.toLowerCase().includes(query)
        )
      : items.value

    return [...filtered].sort(comparators[sortBy.value])
  })

  const load = async () => {
    if (status.value === 'loading') return

    status.value = 'loading'
    error.value = null

    try {
      items.value = await getSneakers()
      status.value = 'ready'
    } catch (loadError) {
      error.value = (loadError as Error).message
      status.value = 'error'
    }
  }

  return { items, status, error, search, sortBy, isLoading, visibleItems, load }
})
