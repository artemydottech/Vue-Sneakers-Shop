<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BoxEnd from '@/components/box-end.vue'
import ColorwayStrip from '@/components/colorway-strip.vue'
import EmptyState from '@/components/empty-state.vue'
import ProductGrid from '@/components/product-grid.vue'
import ProductCard from '@/components/product-card.vue'
import ProductCardSkeleton from '@/components/product-card-skeleton.vue'
import SizeRun from '@/components/size-run.vue'
import UiIcon from '@/components/ui-icon.vue'
import { useCatalogueStore } from '@/stores/catalogue'
import { useFavoritesStore } from '@/stores/favorites'
import { useRecentlyViewedStore } from '@/stores/recently-viewed'
import { CATEGORY_LABELS, DELIVERY_OPTIONS, type Category } from '@/types'
import { formatPrice } from '@/utils/format'
import { SIZE_TABLE, formatSize } from '@/utils/sizes'
import { sneakerName } from '@/utils/sneaker'

const catalogue = useCatalogueStore()
const favorites = useFavoritesStore()
const recentlyViewed = useRecentlyViewedStore()

const WALL_SIZE = 10
const HERO_SLUG = 'jordan-travis-scott-x-air-jordan-1-low-og-olive'

const heroSneaker = computed(
  () => catalogue.items.find((item) => item.slug === HERO_SLUG) ?? catalogue.bestsellers[0] ?? null
)

const wall = computed(() =>
  catalogue.items
    .filter((item) => item.id !== heroSneaker.value?.id)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, WALL_SIZE)
)

const mostWanted = computed(() => catalogue.bestsellers[0] ?? null)
const shelfNew = computed(() => catalogue.newArrivals.slice(0, 8))
const shelfSale = computed(() => catalogue.onSale.slice(0, 3))
const shelfHits = computed(() => catalogue.bestsellers.slice(0, 6))
const recent = computed(() => catalogue.byIds(recentlyViewed.ids).slice(0, 4))

const categories = computed(() =>
  (Object.keys(CATEGORY_LABELS) as Category[]).map((category) => {
    const items = catalogue.items.filter((item) => item.category === category)
    return {
      category,
      label: CATEGORY_LABELS[category],
      count: items.length,
      cover: items[0] ?? null
    }
  })
)

const brands = computed(() =>
  catalogue.brands.map((brand) => ({
    brand,
    count: catalogue.items.filter((item) => item.brand === brand).length
  }))
)

const sizeSpan = computed(() => {
  const all = catalogue.items.flatMap((item) => item.sizes.map((size) => size.eu))
  return all.length ? `${formatSize(Math.min(...all))}–${formatSize(Math.max(...all))}` : ''
})

const pairsWord = (count: number) => {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'пара'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'пары'
  return 'пар'
}

const MEASURE_STEPS = [
  'Встаньте на лист бумаги пяткой к стене, вечером — к концу дня стопа чуть больше.',
  'Отметьте самую дальнюю точку большого пальца и измерьте расстояние от стены в сантиметрах.',
  'Найдите длину в колонке «СМ». Если попали между размерами — берите больший.'
]
</script>

<template>
  <div>
    <section class="border-b-rule border-ink">
      <div class="container-page grid gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-8">
        <div class="flex flex-col lg:col-span-5">
          <h1
            class="font-display text-[clamp(3rem,6.4vw,5.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] lg:leading-[0.9]"
          >
            Каждой паре&nbsp;— своя коробка
          </h1>
          <p class="mt-5 font-mono text-sm uppercase">
            {{ catalogue.brands.length || '' }} брендов · размер прямо с бирки
          </p>

          <div class="mt-7 flex flex-wrap gap-3">
            <RouterLink to="/catalog" class="btn-solid px-6 py-4 text-base">
              Открыть каталог
              <UiIcon name="arrowRight" />
            </RouterLink>
            <RouterLink
              :to="{ path: '/catalog', query: { sort: 'new' } }"
              class="btn-line px-6 py-4 text-base"
            >
              Новинки
            </RouterLink>
          </div>

          <div class="mt-auto pt-8">
            <h2 class="font-display text-sm uppercase tracking-[0.08em]">Только что на полке</h2>
            <div class="mt-3 grid grid-cols-3 gap-3">
              <template v-if="catalogue.isLoading">
                <div v-for="index in 3" :key="index" class="h-24 animate-pulse bg-board-side" />
              </template>
              <RouterLink
                v-for="sneaker in catalogue.newArrivals.slice(0, 3)"
                v-else
                :key="sneaker.id"
                :to="`/product/${sneaker.id}`"
                class="group border-rule border-ink bg-tissue p-2 transition-transform duration-pull ease-pull hover:-translate-y-1"
              >
                <img :src="sneaker.imageUrl" alt="" class="aspect-[16/10] w-full object-cover" />
                <span class="mt-1 block truncate font-mono text-[10px] uppercase">
                  {{ sneakerName(sneaker) }}
                </span>
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div
            v-if="catalogue.isLoading"
            class="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
            aria-busy="true"
          >
            <div
              v-for="index in 15"
              :key="index"
              class="h-20 animate-pulse bg-board-side sm:h-24"
            />
          </div>

          <EmptyState
            v-else-if="catalogue.error"
            title="Стена не загрузилась"
            :description="catalogue.error"
            action-label="Попробовать снова"
            @action="catalogue.load"
          />

          <div
            v-else
            class="grid auto-rows-[6rem] grid-cols-2 gap-2.5 sm:auto-rows-[5.5rem] sm:grid-cols-3"
          >
            <div
              v-if="heroSneaker"
              class="relative z-10 col-span-2 row-span-5 sm:col-start-2 sm:row-span-4 sm:row-start-2 sm:-translate-x-5 sm:-translate-y-5"
            >
              <div
                class="absolute inset-0 translate-x-2 translate-y-2 border-rule border-ink bg-board-deep sm:translate-x-5 sm:translate-y-5"
                aria-hidden="true"
              />
              <RouterLink
                :to="`/product/${heroSneaker.id}`"
                class="group relative flex h-full flex-col border-rule border-ink bg-board"
              >
                <div
                  class="relative min-h-[180px] flex-1 overflow-hidden border-b-rule border-ink bg-tissue"
                >
                  <div class="absolute inset-3 overflow-hidden border-rule border-ink">
                    <img
                      :src="heroSneaker.imageUrl"
                      :alt="sneakerName(heroSneaker)"
                      fetchpriority="high"
                      class="size-full object-cover transition-transform duration-lid ease-pull group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div class="flex">
                  <div class="min-w-0 flex-1 p-4">
                    <p class="label-caps text-3xl">
                      {{ sneakerName(heroSneaker) }}
                    </p>
                    <p class="mt-1 font-mono text-xs uppercase">{{ heroSneaker.colorway }}</p>
                    <SizeRun :sizes="heroSneaker.sizes" class="mt-2" />
                    <p class="mt-2 flex items-center justify-between gap-3">
                      <b class="font-mono text-xl">{{ formatPrice(heroSneaker.price) }}</b>
                      <span
                        class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.06em] group-hover:underline"
                      >
                        Открыть коробку <UiIcon name="arrowRight" />
                      </span>
                    </p>
                  </div>
                  <ColorwayStrip :colors="heroSneaker.colors" />
                </div>
              </RouterLink>
            </div>

            <div v-for="sneaker in wall" :key="sneaker.id">
              <BoxEnd :sneaker="sneaker" />
            </div>
          </div>
        </div>
      </div>

      <div class="border-t-rule border-ink bg-ink text-tissue">
        <dl
          class="container-page grid grid-cols-2 divide-tissue/30 sm:grid-cols-4 sm:divide-x-[1.5px] [&>div]:py-3 sm:[&>div:not(:first-child)]:pl-5"
        >
          <div>
            <dt class="font-mono text-[11px] uppercase">На полке</dt>
            <dd class="font-mono text-2xl font-bold leading-tight">
              {{ catalogue.items.length }} {{ pairsWord(catalogue.items.length) }}
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[11px] uppercase">Брендов</dt>
            <dd class="font-mono text-2xl font-bold leading-tight">
              {{ catalogue.brands.length }}
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[11px] uppercase">Размеры EU</dt>
            <dd class="font-mono text-2xl font-bold leading-tight">{{ sizeSpan || '—' }}</dd>
          </div>
          <div v-if="mostWanted">
            <dt class="font-mono text-[11px] uppercase">Ищут чаще всего</dt>
            <dd>
              <RouterLink
                :to="`/product/${mostWanted.id}`"
                class="inline-flex items-center gap-2 font-display text-xl uppercase leading-tight hover:underline"
              >
                <span class="truncate">{{ sneakerName(mostWanted) }}</span>
                <UiIcon name="arrowRight" class="!size-4" />
              </RouterLink>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="container-page py-16" aria-labelledby="categories-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="categories-title" class="label-caps text-5xl sm:text-6xl">По полкам</h2>
        <RouterLink
          to="/catalog"
          class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.06em] hover:underline"
        >
          Весь каталог
          <UiIcon name="arrowRight" class="!size-4" />
        </RouterLink>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <RouterLink
          v-for="entry in categories"
          :key="entry.category"
          :to="{ path: '/catalog', query: { category: entry.category } }"
          class="group relative block"
        >
          <span class="absolute inset-0 border-rule border-ink bg-board-deep" aria-hidden="true" />
          <span
            class="relative flex h-full flex-col border-rule border-ink bg-board transition-transform duration-pull ease-pull group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
          >
            <span class="notch" aria-hidden="true" />
            <span
              class="relative mx-4 mt-6 block aspect-[4/3] overflow-hidden border-rule border-ink"
            >
              <img
                v-if="entry.cover"
                :src="entry.cover.imageUrl"
                alt=""
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
              />
            </span>
            <span class="flex items-end justify-between gap-2 border-t-rule border-ink p-4">
              <span class="label-caps text-2xl sm:text-3xl">{{ entry.label }}</span>
              <span class="font-mono text-sm">{{ entry.count }}</span>
            </span>
          </span>
        </RouterLink>
      </div>
    </section>

    <section class="border-y-rule border-ink" aria-labelledby="new-title">
      <div class="container-page py-16">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="new-title" class="label-caps text-5xl sm:text-6xl">Новинки</h2>
          <RouterLink
            :to="{ path: '/catalog', query: { sort: 'new' } }"
            class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.06em] hover:underline"
          >
            Все новинки
            <UiIcon name="arrowRight" class="!size-4" />
          </RouterLink>
        </div>

        <div
          class="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-2 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        >
          <template v-if="catalogue.isLoading">
            <div v-for="index in 4" :key="index" class="w-[260px] shrink-0 sm:w-[300px]">
              <ProductCardSkeleton />
            </div>
          </template>
          <div
            v-for="sneaker in shelfNew"
            v-else
            :key="sneaker.id"
            class="w-[260px] shrink-0 snap-start sm:w-[300px]"
          >
            <ProductCard
              :sneaker="sneaker"
              :is-favorite="favorites.has(sneaker.id)"
              @toggle-favorite="favorites.toggle"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="container-page py-16" aria-labelledby="hits-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="hits-title" class="label-caps text-5xl sm:text-6xl">Берут чаще всего</h2>
        <RouterLink
          to="/catalog"
          class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.06em] hover:underline"
        >
          Все пары
          <UiIcon name="arrowRight" class="!size-4" />
        </RouterLink>
      </div>
      <ProductGrid
        class="mt-8"
        :items="shelfHits"
        :is-loading="catalogue.isLoading"
        :skeleton-count="6"
        show-sizes
      />
    </section>

    <section class="border-y-rule border-ink" aria-labelledby="brands-title">
      <div class="container-page py-16">
        <h2 id="brands-title" class="label-caps text-5xl sm:text-6xl">Бренды на стене</h2>
        <ul
          class="mt-8 grid grid-cols-2 border-l-rule border-t-rule border-ink sm:grid-cols-3 lg:grid-cols-5"
        >
          <li
            v-for="entry in brands"
            :key="entry.brand"
            class="border-b-rule border-r-rule border-ink"
          >
            <RouterLink
              :to="{ path: '/catalog', query: { brand: entry.brand } }"
              class="flex h-full items-end justify-between gap-3 p-5 transition-colors hover:bg-ink hover:text-tissue"
            >
              <span class="font-display text-3xl font-semibold uppercase leading-none">{{
                entry.brand
              }}</span>
              <span class="font-mono text-sm">{{ entry.count }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="catalogue.isLoading || shelfSale.length"
      class="container-page py-16"
      aria-labelledby="sale-title"
    >
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="sale-title" class="label-caps text-5xl sm:text-6xl">Со скидкой</h2>
        <RouterLink
          :to="{ path: '/catalog', query: { sale: '1' } }"
          class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.06em] hover:underline"
        >
          Все скидки
          <UiIcon name="arrowRight" class="!size-4" />
        </RouterLink>
      </div>
      <ProductGrid
        class="mt-8"
        :items="shelfSale"
        :is-loading="catalogue.isLoading"
        :skeleton-count="3"
      />
    </section>

    <section id="sizes" class="border-t-rule border-ink" aria-labelledby="sizes-title">
      <div class="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="sizes-title" class="label-caps text-5xl sm:text-6xl">
            Как не ошибиться с размером
          </h2>
          <ol class="mt-8 space-y-6">
            <li
              v-for="(step, index) in MEASURE_STEPS"
              :key="step"
              class="grid grid-cols-[2.5rem_1fr] gap-3"
            >
              <span
                class="grid size-10 place-items-center border-rule border-ink font-mono font-bold"
                >{{ index + 1 }}</span
              >
              <p class="max-w-[48ch] pt-2 leading-relaxed">{{ step }}</p>
            </li>
          </ol>

          <dl class="mt-10 grid gap-px border-rule border-ink bg-ink sm:grid-cols-2">
            <div class="flex gap-3 bg-tissue p-5">
              <UiIcon name="truck" />
              <div>
                <dt class="font-display uppercase">Доставка</dt>
                <dd class="mt-1 text-sm">
                  Курьером за {{ formatPrice(DELIVERY_OPTIONS.courier.price) }},
                  {{ DELIVERY_OPTIONS.courier.eta }}. В пункт выдачи — бесплатно.
                </dd>
              </div>
            </div>
            <div class="flex gap-3 bg-tissue p-5">
              <UiIcon name="returnBox" />
              <div>
                <dt class="font-display uppercase">Возврат</dt>
                <dd class="mt-1 text-sm">14 дней, если пара не подошла и сохранила вид.</dd>
              </div>
            </div>
          </dl>
        </div>

        <div class="overflow-x-auto">
          <table
            class="w-full border-collapse border-rule border-ink bg-tissue text-center font-mono text-sm"
          >
            <caption class="sr-only">
              Таблица соответствия размеров
            </caption>
            <thead>
              <tr class="bg-ink text-tissue">
                <th scope="col" class="px-3 py-3 font-bold">EU</th>
                <th scope="col" class="px-3 py-3 font-bold">US</th>
                <th scope="col" class="px-3 py-3 font-bold">UK</th>
                <th scope="col" class="px-3 py-3 font-bold">СМ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in SIZE_TABLE"
                :key="row.eu"
                class="border-t border-ink/30 hover:bg-board/40"
              >
                <th scope="row" class="px-3 py-2 font-bold">{{ formatSize(row.eu) }}</th>
                <td class="px-3 py-2">{{ formatSize(row.eu, 'us') }}</td>
                <td class="px-3 py-2">{{ formatSize(row.eu, 'uk') }}</td>
                <td class="px-3 py-2">{{ formatSize(row.eu, 'cm') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section
      v-if="recent.length"
      class="container-page border-t-rule border-ink py-16"
      aria-labelledby="recent-title"
    >
      <h2 id="recent-title" class="label-caps text-4xl sm:text-5xl">Вы смотрели</h2>
      <ProductGrid class="mt-8" :items="recent" :columns="4" />
    </section>
  </div>
</template>
