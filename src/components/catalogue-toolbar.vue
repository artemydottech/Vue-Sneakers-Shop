<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { SORT_OPTIONS, type SortKey } from '@/types'
import UiIcon from './ui-icon.vue'

const props = defineProps<{
  search: string
  sortBy: SortKey
  activeFilterCount: number
}>()

const emit = defineEmits<{
  search: [value: string]
  sort: [value: SortKey]
  openFilters: []
}>()

const SEARCH_DEBOUNCE_MS = 350

const query = ref(props.search)
let timer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.search,
  (value) => {
    if (value !== query.value.trim()) query.value = value
  }
)

watch(query, (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => emit('search', value.trim()), SEARCH_DEBOUNCE_MS)
})

onBeforeUnmount(() => clearTimeout(timer))

const onSortChange = (event: Event) => {
  emit('sort', (event.target as HTMLSelectElement).value as SortKey)
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <label class="relative block flex-1">
      <span class="sr-only">Поиск по каталогу</span>
      <UiIcon
        name="search"
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
      />
      <input
        v-model="query"
        type="search"
        placeholder="Модель, бренд или цвет"
        class="field pl-11"
      />
    </label>

    <div class="flex gap-3">
      <label class="relative block flex-1 sm:w-60 sm:flex-none">
        <span class="sr-only">Сортировка</span>
        <select
          :value="sortBy"
          class="field cursor-pointer appearance-none pr-10"
          @change="onSortChange"
        >
          <option v-for="(label, key) in SORT_OPTIONS" :key="key" :value="key">{{ label }}</option>
        </select>
        <UiIcon
          name="chevronDown"
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </label>

      <button type="button" class="btn-line-tissue lg:hidden" @click="emit('openFilters')">
        <UiIcon name="filter" />
        Фильтры
        <span v-if="activeFilterCount" class="font-mono">{{ activeFilterCount }}</span>
      </button>
    </div>
  </div>
</template>
