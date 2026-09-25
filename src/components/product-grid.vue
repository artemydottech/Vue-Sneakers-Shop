<script setup lang="ts">
import type { Sneaker } from '@/types'
import ProductCard from './product-card.vue'
import ProductCardSkeleton from './product-card-skeleton.vue'
import { useFavoritesStore } from '@/stores/favorites'

withDefaults(
  defineProps<{
    items: Sneaker[]
    isLoading?: boolean
    skeletonCount?: number
    showSizes?: boolean
    columns?: 3 | 4
  }>(),
  { skeletonCount: 8, columns: 3 }
)

const favorites = useFavoritesStore()

const GRID_CLASS = {
  3: 'grid grid-cols-1 gap-x-5 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-3',
  4: 'grid grid-cols-1 gap-x-5 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-4'
} as const
</script>

<template>
  <div v-if="isLoading" :class="GRID_CLASS[columns]" aria-busy="true">
    <span class="sr-only">Загружаем каталог</span>
    <ProductCardSkeleton v-for="index in skeletonCount" :key="index" />
  </div>

  <div v-else :class="GRID_CLASS[columns]">
    <ProductCard
      v-for="sneaker in items"
      :key="sneaker.id"
      :sneaker="sneaker"
      :is-favorite="favorites.has(sneaker.id)"
      :show-sizes="showSizes"
      @toggle-favorite="favorites.toggle"
    />
  </div>
</template>
