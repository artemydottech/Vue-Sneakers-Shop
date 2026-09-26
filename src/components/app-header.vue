<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import UiIcon from './ui-icon.vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useOrdersStore } from '@/stores/orders'

const emit = defineEmits<{
  openCart: []
}>()

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const favorites = useFavoritesStore()
const orders = useOrdersStore()

const searchQuery = ref('')

watch(
  () => route.query.q,
  (value) => {
    searchQuery.value = typeof value === 'string' ? value : ''
  },
  { immediate: true }
)

const submitSearch = () => {
  const q = searchQuery.value.trim()
  router.push({ path: '/catalog', query: q ? { q } : {} })
}

const NAV_LINKS = [
  { label: 'Каталог', to: { path: '/catalog' }, section: 'all' },
  { label: 'Новинки', to: { path: '/catalog', query: { sort: 'new' } }, section: 'new' },
  { label: 'Скидки', to: { path: '/catalog', query: { sale: '1' } }, section: 'sale' }
] as const

const catalogSection = computed(() => {
  if (route.path !== '/catalog') return null
  if (route.query.sale === '1') return 'sale'
  if (route.query.sort === 'new') return 'new'
  return 'all'
})

const linkClass =
  'whitespace-nowrap font-display text-sm uppercase tracking-[0.08em] underline-offset-[6px] decoration-[1.5px] hover:underline aria-[current=page]:underline'
</script>

<template>
  <header class="sticky top-0 z-30 border-b-rule border-ink bg-board">
    <div class="container-page flex h-16 items-center gap-6 lg:h-[72px]">
      <RouterLink
        to="/"
        class="font-display text-3xl font-bold uppercase leading-none tracking-tight"
      >
        Пара
      </RouterLink>

      <nav aria-label="Разделы" class="hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.label"
          :to="link.to"
          :class="linkClass"
          :aria-current="catalogSection === link.section ? 'page' : undefined"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/orders" :class="linkClass">
          Заказы<span v-if="orders.count" class="font-mono"> · {{ orders.count }}</span>
        </RouterLink>
      </nav>

      <form
        role="search"
        class="ml-auto hidden max-w-xs flex-1 lg:block"
        @submit.prevent="submitSearch"
      >
        <label class="relative block">
          <span class="sr-only">Поиск по каталогу</span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Модель, бренд, цвет"
            class="field py-2 pr-10"
          />
          <button
            type="submit"
            aria-label="Найти"
            class="absolute inset-y-0 right-0 grid w-10 place-items-center"
          >
            <UiIcon name="search" />
          </button>
        </label>
      </form>

      <div class="ml-auto flex items-center lg:ml-0">
        <RouterLink
          to="/catalog"
          aria-label="Поиск"
          class="grid size-11 place-items-center lg:hidden"
        >
          <UiIcon name="search" />
        </RouterLink>

        <RouterLink
          to="/favorites"
          class="relative grid size-11 place-items-center"
          :aria-label="`Закладки: ${favorites.count}`"
        >
          <UiIcon name="heart" />
          <span
            v-if="favorites.count"
            class="absolute right-0.5 top-1 min-w-5 border-rule border-ink bg-tissue px-1 text-center font-mono text-[10px] font-bold leading-4"
          >
            {{ favorites.count }}
          </span>
        </RouterLink>

        <button
          type="button"
          class="btn-solid ml-2 px-4 py-2.5"
          :aria-label="`Корзина: ${cart.count} шт.`"
          @click="emit('openCart')"
        >
          <UiIcon name="bag" />
          <span class="font-mono text-sm font-bold">{{ cart.count }}</span>
        </button>
      </div>
    </div>

    <nav
      aria-label="Разделы"
      class="container-page flex gap-6 overflow-x-auto border-t-rule border-ink py-2.5 md:hidden"
    >
      <RouterLink
        v-for="link in NAV_LINKS"
        :key="link.label"
        :to="link.to"
        :class="linkClass"
        :aria-current="catalogSection === link.section ? 'page' : undefined"
      >
        {{ link.label }}
      </RouterLink>
      <RouterLink to="/orders" :class="linkClass">
        Заказы<span v-if="orders.count" class="font-mono"> · {{ orders.count }}</span>
      </RouterLink>
    </nav>
  </header>
</template>
