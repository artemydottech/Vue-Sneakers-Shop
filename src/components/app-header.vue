<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useOrdersStore } from '@/stores/orders'
import { formatPrice } from '@/utils/format'

const emit = defineEmits<{
  openCart: []
}>()

const cart = useCartStore()
const favorites = useFavoritesStore()
const orders = useOrdersStore()

const linkClass =
  'relative text-sm text-ink-muted transition hover:text-white aria-[current=page]:text-white'
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-ink-line bg-ink/85 backdrop-blur-xl">
    <div class="container-page flex h-[72px] items-center justify-between gap-6">
      <RouterLink to="/" class="flex items-baseline gap-2 text-white">
        <span class="text-lg font-semibold uppercase tracking-[0.2em]">Sneakers</span>
        <span class="hidden text-[11px] uppercase tracking-[0.3em] text-accent sm:inline">2.0</span>
      </RouterLink>

      <nav class="flex items-center gap-6">
        <RouterLink to="/" :class="linkClass">Каталог</RouterLink>

        <RouterLink to="/favorites" :class="linkClass">
          Закладки
          <span
            v-if="favorites.count"
            class="ml-1 rounded-full bg-ink-line px-1.5 py-0.5 text-[10px] text-white"
          >
            {{ favorites.count }}
          </span>
        </RouterLink>

        <RouterLink to="/orders" :class="linkClass">
          Заказы
          <span
            v-if="orders.count"
            class="ml-1 rounded-full bg-ink-line px-1.5 py-0.5 text-[10px] text-white"
          >
            {{ orders.count }}
          </span>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="flex items-center gap-3 rounded-2xl bg-ink-soft px-4 py-2.5 text-white transition hover:bg-accent hover:text-ink"
        @click="emit('openCart')"
      >
        <span class="relative grid place-items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="size-5"
          >
            <path
              d="M4 6h2l1.6 9.2a2 2 0 0 0 2 1.7h6.9a2 2 0 0 0 2-1.6L20 9H6.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="10" cy="20" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          <span
            v-if="cart.count"
            class="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-ink"
          >
            {{ cart.count }}
          </span>
        </span>
        <b class="hidden text-sm tabular-nums sm:inline">{{ formatPrice(cart.total) }}</b>
      </button>
    </div>
  </header>
</template>
