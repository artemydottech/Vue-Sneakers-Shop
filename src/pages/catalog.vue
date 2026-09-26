<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CatalogueFiltersPanel from '@/components/catalogue-filters.vue'
import CatalogueToolbar from '@/components/catalogue-toolbar.vue'
import EmptyState from '@/components/empty-state.vue'
import ProductGrid from '@/components/product-grid.vue'
import UiIcon from '@/components/ui-icon.vue'
import { useCatalogueStore } from '@/stores/catalogue'
import { CATEGORY_LABELS, GENDER_LABELS, type CatalogueFilters, type SortKey } from '@/types'
import {
  DEFAULT_FILTERS,
  applyFilters,
  countActiveFilters,
  filtersFromQuery,
  filtersToQuery
} from '@/utils/catalogue-filters'
import { formatPrice } from '@/utils/format'
import { formatSize } from '@/utils/sizes'

const route = useRoute()
const router = useRouter()
const catalogue = useCatalogueStore()

const filters = computed(() => filtersFromQuery(route.query))
const visibleItems = computed(() => applyFilters(catalogue.items, filters.value))
const activeFilterCount = computed(() => countActiveFilters(filters.value))

const isFiltersOpen = ref(false)
const sheetCloseButton = ref<Nullable<HTMLButtonElement>>(null)

const setFilters = (next: CatalogueFilters, replace = false) => {
  const location = { path: '/catalog', query: filtersToQuery(next) }
  if (replace) router.replace(location)
  else router.push(location)
}

const applyFromPanel = (next: CatalogueFilters) => {
  setFilters(next)
  isFiltersOpen.value = false
}

const onSearch = (search: string) => {
  if (search !== filters.value.search) setFilters({ ...filters.value, search }, true)
}

const onSort = (sortBy: SortKey) => setFilters({ ...filters.value, sortBy })

const resetAll = () => setFilters({ ...DEFAULT_FILTERS })

const title = computed(() => {
  const { categories, onlySale, sortBy, brands } = filters.value
  if (onlySale) return 'Со скидкой'
  if (categories.length === 1 && categories[0]) return CATEGORY_LABELS[categories[0]]
  if (brands.length === 1 && brands[0]) return brands[0]
  if (sortBy === 'new') return 'Новинки'
  return 'Каталог'
})

interface ActiveChip {
  key: string
  label: string
  remove: () => void
}

const chips = computed<ActiveChip[]>(() => {
  const current = filters.value
  const without = (patch: Partial<CatalogueFilters>) => () => setFilters({ ...current, ...patch })

  return [
    ...current.categories.map((category) => ({
      key: `category-${category}`,
      label: CATEGORY_LABELS[category],
      remove: without({ categories: current.categories.filter((item) => item !== category) })
    })),
    ...current.genders.map((gender) => ({
      key: `gender-${gender}`,
      label: GENDER_LABELS[gender],
      remove: without({ genders: current.genders.filter((item) => item !== gender) })
    })),
    ...current.brands.map((brand) => ({
      key: `brand-${brand}`,
      label: brand,
      remove: without({ brands: current.brands.filter((item) => item !== brand) })
    })),
    ...current.sizes.map((size) => ({
      key: `size-${size}`,
      label: `EU ${formatSize(size)}`,
      remove: without({ sizes: current.sizes.filter((item) => item !== size) })
    })),
    ...(current.priceMin !== null
      ? [
          {
            key: 'from',
            label: `от ${formatPrice(current.priceMin)}`,
            remove: without({ priceMin: null })
          }
        ]
      : []),
    ...(current.priceMax !== null
      ? [
          {
            key: 'to',
            label: `до ${formatPrice(current.priceMax)}`,
            remove: without({ priceMax: null })
          }
        ]
      : []),
    ...(current.onlySale
      ? [{ key: 'sale', label: 'Со скидкой', remove: without({ onlySale: false }) }]
      : [])
  ]
})

const onSheetKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') isFiltersOpen.value = false
}

watch(isFiltersOpen, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    document.addEventListener('keydown', onSheetKeydown)
    await nextTick()
    sheetCloseButton.value?.focus()
  } else {
    document.removeEventListener('keydown', onSheetKeydown)
  }
})

const resultWord = (count: number) => {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'пара'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'пары'
  return 'пар'
}
</script>

<template>
  <div class="container-page py-10 lg:py-14">
    <div class="flex flex-wrap items-end justify-between gap-4 border-b-rule border-ink pb-6">
      <h1 class="label-caps text-6xl sm:text-7xl">{{ title }}</h1>
      <p v-if="!catalogue.isLoading" class="font-mono text-sm" aria-live="polite">
        {{ visibleItems.length }} {{ resultWord(visibleItems.length) }} из
        {{ catalogue.items.length }}
      </p>
    </div>

    <div class="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside class="hidden lg:block" aria-label="Фильтры">
        <div class="sticky top-28">
          <CatalogueFiltersPanel
            :filters="filters"
            :brands="catalogue.brands"
            :price-range="catalogue.priceRange"
            @apply="setFilters"
          />
        </div>
      </aside>

      <div class="min-w-0">
        <CatalogueToolbar
          :search="filters.search"
          :sort-by="filters.sortBy"
          :active-filter-count="activeFilterCount"
          @search="onSearch"
          @sort="onSort"
          @open-filters="isFiltersOpen = true"
        />

        <ul v-if="chips.length" class="mt-4 flex flex-wrap gap-2" aria-label="Активные фильтры">
          <li v-for="chip in chips" :key="chip.key">
            <button
              type="button"
              class="inline-flex items-center gap-2 border-rule border-ink bg-ink px-3 py-1.5 text-sm text-tissue hover:bg-ink-soft"
              :aria-label="`Убрать фильтр ${chip.label}`"
              @click="chip.remove"
            >
              {{ chip.label }}
              <UiIcon name="close" class="!size-4" />
            </button>
          </li>
          <li>
            <button
              type="button"
              class="px-2 py-1.5 text-sm underline decoration-[1.5px] underline-offset-4"
              @click="resetAll"
            >
              Сбросить всё
            </button>
          </li>
        </ul>

        <div class="mt-8">
          <EmptyState
            v-if="catalogue.error"
            title="Каталог не загрузился"
            :description="catalogue.error"
            action-label="Попробовать снова"
            @action="catalogue.load"
          />

          <ProductGrid v-else-if="catalogue.isLoading" :items="[]" is-loading :skeleton-count="9" />

          <EmptyState
            v-else-if="!visibleItems.length"
            title="Пустая полка"
            description="С такими условиями пар нет. Уберите пару фильтров или сбросьте всё сразу."
            action-label="Сбросить фильтры"
            @action="resetAll"
          />

          <ProductGrid v-else :items="visibleItems" show-sizes />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-from-class="translate-y-full"
        enter-active-class="transition-transform duration-lid ease-pull"
        leave-to-class="translate-y-full"
        leave-active-class="transition-transform duration-pull ease-pull"
      >
        <div
          v-if="isFiltersOpen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filters-title"
          class="fixed inset-0 z-50 flex flex-col bg-board-shelf lg:hidden"
        >
          <div class="flex items-center justify-between border-b-rule border-ink px-4 py-3">
            <h2 id="filters-title" class="label-caps text-3xl">Фильтры</h2>
            <button
              ref="sheetCloseButton"
              type="button"
              aria-label="Закрыть фильтры"
              class="grid size-10 place-items-center border-rule border-ink hover:bg-ink hover:text-tissue"
              @click="isFiltersOpen = false"
            >
              <UiIcon name="close" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-4 pt-6">
            <CatalogueFiltersPanel
              :filters="filters"
              :brands="catalogue.brands"
              :price-range="catalogue.priceRange"
              @apply="applyFromPanel"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
