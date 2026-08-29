<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Sneaker } from '@/types'
import { formatPrice } from '@/utils/format'

defineProps<{
  sneaker: Sneaker
  isFavorite: boolean
  isInCart: boolean
}>()

const emit = defineEmits<{
  toggleFavorite: [id: number]
  toggleCart: [sneaker: Sneaker]
}>()
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-4xl border border-zinc-200 bg-white transition duration-500 ease-smooth hover:-translate-y-1 hover:shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)]"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-zinc-50">
      <img
        :src="sneaker.imageUrl"
        :alt="sneaker.title"
        loading="lazy"
        class="size-full object-contain p-6 transition duration-700 ease-smooth group-hover:scale-[1.08]"
      />

      <button
        type="button"
        :aria-label="isFavorite ? 'Убрать из закладок' : 'Добавить в закладки'"
        :aria-pressed="isFavorite"
        class="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white"
        @click="emit('toggleFavorite', sneaker.id)"
      >
        <svg
          viewBox="0 0 24 24"
          stroke-width="1.8"
          class="size-[18px] transition"
          :class="isFavorite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-zinc-400'"
        >
          <path
            d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="mt-auto flex items-end justify-between gap-4 bg-ink p-5 text-white">
      <div class="min-w-0">
        <p class="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{{ sneaker.brand }}</p>
        <h3 class="truncate text-sm font-medium">{{ sneaker.title }}</h3>
        <p class="mt-1 text-lg font-semibold tabular-nums">{{ formatPrice(sneaker.price) }}</p>
      </div>

      <button
        type="button"
        :aria-label="isInCart ? 'Убрать из корзины' : 'Добавить в корзину'"
        class="relative z-20 grid size-11 shrink-0 place-items-center rounded-2xl transition duration-300 ease-smooth"
        :class="
          isInCart ? 'bg-accent text-ink' : 'bg-ink-soft text-white hover:bg-accent hover:text-ink'
        "
        @click="emit('toggleCart', sneaker)"
      >
        <svg
          v-if="isInCart"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          class="size-5"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          class="size-5"
        >
          <path d="M12 5v14M5 12h14" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <RouterLink
      :to="`/product/${sneaker.id}`"
      class="absolute inset-0 z-10"
      :aria-label="`${sneaker.brand} ${sneaker.title}`"
    />
  </article>
</template>
