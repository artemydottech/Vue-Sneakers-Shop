<script setup lang="ts">
import { SORT_OPTIONS, type SortKey } from '@/types'
import { useCatalogueStore } from '@/stores/catalogue'

const catalogue = useCatalogueStore()

const onSortChange = (event: Event) => {
  catalogue.sortBy = (event.target as HTMLSelectElement).value as SortKey
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Каталог</h1>
      <p class="mt-1 text-sm text-zinc-500">
        {{ catalogue.visibleItems.length }} из {{ catalogue.items.length }} моделей
      </p>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label class="relative block">
        <span class="sr-only">Поиск по каталогу</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" stroke-linecap="round" />
        </svg>
        <input
          v-model="catalogue.search"
          type="search"
          placeholder="Найти кроссовки"
          class="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm transition placeholder:text-zinc-400 hover:border-zinc-300 sm:w-64"
        />
      </label>

      <label class="block">
        <span class="sr-only">Сортировка</span>
        <select
          :value="catalogue.sortBy"
          class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm transition hover:border-zinc-300 sm:w-56"
          @change="onSortChange"
        >
          <option v-for="(label, key) in SORT_OPTIONS" :key="key" :value="key">{{ label }}</option>
        </select>
      </label>
    </div>
  </div>
</template>
