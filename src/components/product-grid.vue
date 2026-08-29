<script setup lang="ts">
import type { Sneaker } from '@/types'
import ProductCard from './product-card.vue'
import ProductCardSkeleton from './product-card-skeleton.vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

defineProps<{
  items: Sneaker[]
  isLoading?: boolean
}>()

const SKELETON_COUNT = 8

const cart = useCartStore()
const favorites = useFavoritesStore()
</script>

<template>
  <div v-if="isLoading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <ProductCardSkeleton v-for="index in SKELETON_COUNT" :key="index" />
  </div>

  <TransitionGroup
    v-else
    tag="div"
    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    enter-from-class="opacity-0 translate-y-3"
    enter-active-class="transition duration-500 ease-smooth"
    leave-to-class="opacity-0 scale-95"
    leave-active-class="absolute transition duration-300 ease-smooth"
  >
    <ProductCard
      v-for="sneaker in items"
      :key="sneaker.id"
      :sneaker="sneaker"
      :is-favorite="favorites.has(sneaker.id)"
      :is-in-cart="cart.has(sneaker.id)"
      @toggle-favorite="favorites.toggle"
      @toggle-cart="cart.toggle"
    />
  </TransitionGroup>
</template>
