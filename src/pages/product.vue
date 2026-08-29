<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductGrid from '@/components/product-grid.vue'
import EmptyState from '@/components/empty-state.vue'
import { useCartStore } from '@/stores/cart'
import { useCatalogueStore } from '@/stores/catalogue'
import { useFavoritesStore } from '@/stores/favorites'
import { formatPrice } from '@/utils/format'

const route = useRoute()
const catalogue = useCatalogueStore()
const cart = useCartStore()
const favorites = useFavoritesStore()

const sneaker = computed(() => catalogue.byId(Number(route.params.id)))
const related = computed(() => (sneaker.value ? catalogue.relatedTo(sneaker.value) : []))
</script>

<template>
  <div v-if="catalogue.isLoading" class="grid gap-8 lg:grid-cols-2">
    <div class="aspect-square animate-pulse rounded-4xl bg-white" />
    <div class="space-y-4 py-6">
      <div class="h-3 w-20 animate-pulse rounded-full bg-zinc-200" />
      <div class="h-9 w-3/4 animate-pulse rounded-full bg-zinc-200" />
      <div class="h-7 w-32 animate-pulse rounded-full bg-zinc-200" />
      <div class="h-24 w-full animate-pulse rounded-3xl bg-zinc-200" />
    </div>
  </div>

  <EmptyState
    v-else-if="!sneaker"
    title="Модель не найдена"
    description="Возможно, её убрали из каталога или ссылка устарела."
    image-url="/empty-box.png"
    action-label="Вернуться в каталог"
    @action="$router.push('/')"
  />

  <div v-else class="space-y-16">
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-4">
        <path d="M14 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Каталог
    </RouterLink>

    <div class="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div
        class="grid aspect-square place-items-center overflow-hidden rounded-4xl border border-zinc-200 bg-white"
      >
        <img :src="sneaker.imageUrl" :alt="sneaker.title" class="size-full object-contain p-12" />
      </div>

      <div class="flex flex-col justify-center">
        <p class="text-[11px] uppercase tracking-[0.22em] text-zinc-400">{{ sneaker.brand }}</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{{ sneaker.title }}</h1>
        <p class="mt-4 text-3xl font-semibold tabular-nums">{{ formatPrice(sneaker.price) }}</p>

        <p v-if="sneaker.description" class="mt-6 text-sm leading-relaxed text-zinc-600">
          {{ sneaker.description }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="flex-1 rounded-2xl px-6 py-4 text-sm font-semibold transition duration-300 ease-smooth"
            :class="
              cart.has(sneaker.id)
                ? 'bg-ink text-white hover:bg-ink-soft'
                : 'bg-accent text-ink hover:bg-accent-dark'
            "
            @click="cart.toggle(sneaker)"
          >
            {{ cart.has(sneaker.id) ? 'Убрать из корзины' : 'Добавить в корзину' }}
          </button>

          <button
            type="button"
            :aria-label="favorites.has(sneaker.id) ? 'Убрать из закладок' : 'В закладки'"
            :aria-pressed="favorites.has(sneaker.id)"
            class="grid size-[54px] shrink-0 place-items-center rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300"
            @click="favorites.toggle(sneaker.id)"
          >
            <svg
              viewBox="0 0 24 24"
              stroke-width="1.8"
              class="size-5 transition"
              :class="
                favorites.has(sneaker.id)
                  ? 'fill-rose-500 stroke-rose-500'
                  : 'fill-none stroke-zinc-400'
              "
            >
              <path
                d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <dl
          class="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 text-sm"
        >
          <div class="bg-white px-5 py-4">
            <dt class="text-xs text-zinc-400">Бренд</dt>
            <dd class="mt-1 font-medium">{{ sneaker.brand }}</dd>
          </div>
          <div class="bg-white px-5 py-4">
            <dt class="text-xs text-zinc-400">Артикул</dt>
            <dd class="mt-1 font-medium tabular-nums">
              SN-{{ String(sneaker.id).padStart(4, '0') }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <section v-if="related.length" class="space-y-6">
      <h2 class="text-2xl font-semibold tracking-tight">Похожие модели</h2>
      <ProductGrid :items="related" />
    </section>
  </div>
</template>
