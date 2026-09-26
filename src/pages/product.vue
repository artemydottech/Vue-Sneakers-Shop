<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'
import ProductGallery from '@/components/product-gallery.vue'
import ProductGrid from '@/components/product-grid.vue'
import ProductReviews from '@/components/product-reviews.vue'
import RatingStars from '@/components/rating-stars.vue'
import SizePicker from '@/components/size-picker.vue'
import UiIcon from '@/components/ui-icon.vue'
import { useCartStore } from '@/stores/cart'
import { useCatalogueStore } from '@/stores/catalogue'
import { useFavoritesStore } from '@/stores/favorites'
import { useRecentlyViewedStore } from '@/stores/recently-viewed'
import { CATEGORY_LABELS, DELIVERY_OPTIONS, GENDER_LABELS } from '@/types'
import { isOnSale, salePercent } from '@/utils/catalogue-filters'
import { formatPrice } from '@/utils/format'
import { SIZE_SYSTEMS, formatSize, type SizeSystem } from '@/utils/sizes'
import { sneakerName } from '@/utils/sneaker'

const route = useRoute()
const router = useRouter()
const catalogue = useCatalogueStore()
const cart = useCartStore()
const favorites = useFavoritesStore()
const recentlyViewed = useRecentlyViewedStore()

const sneakerId = computed(() => Number(route.params.sneakerId))
const sneaker = computed(() => catalogue.byId(sneakerId.value))

const selectedSize = ref<Nullable<number>>(null)
const sizeSystem = ref<SizeSystem>('eu')
const sizeError = ref(false)
const justAdded = ref(false)

const related = computed(() => (sneaker.value ? catalogue.relatedTo(sneaker.value, 4) : []))
const recent = computed(() =>
  catalogue.byIds(recentlyViewed.ids.filter((id) => id !== sneakerId.value)).slice(0, 4)
)

const selectedStock = computed(
  () => sneaker.value?.sizes.find((size) => size.eu === selectedSize.value)?.stock ?? 0
)
const isSoldOut = computed(() => sneaker.value?.sizes.every((size) => size.stock === 0) ?? false)
const isSelectedInCart = computed(() =>
  sneaker.value && selectedSize.value !== null
    ? cart.has(sneaker.value.id, selectedSize.value)
    : false
)

watch(
  sneaker,
  (value) => {
    if (!value) return
    recentlyViewed.track(value.id)
    document.title = `${sneakerName(value)} — Пара`
  },
  { immediate: true }
)

watch(selectedSize, () => {
  sizeError.value = false
  justAdded.value = false
})

const addToCart = () => {
  if (!sneaker.value) return
  if (selectedSize.value === null) {
    sizeError.value = true
    document.getElementById('size-picker')?.scrollIntoView({ block: 'center' })
    return
  }
  cart.add(sneaker.value, selectedSize.value)
  justAdded.value = true
}

const sizeLabel = (eu: number) =>
  `${SIZE_SYSTEMS[sizeSystem.value]} ${formatSize(eu, sizeSystem.value)}`

const specs = computed(() => {
  const value = sneaker.value
  if (!value) return []
  return [
    { label: 'Артикул', value: value.styleCode },
    { label: 'Категория', value: CATEGORY_LABELS[value.category] },
    { label: 'Для кого', value: GENDER_LABELS[value.gender] },
    { label: 'Год выпуска', value: String(value.releaseYear) },
    { label: 'Верх', value: value.materials.upper },
    { label: 'Подкладка', value: value.materials.lining },
    { label: 'Подошва', value: value.materials.sole }
  ]
})
</script>

<template>
  <div class="container-page py-8 lg:py-12">
    <div v-if="catalogue.isLoading" class="grid gap-10 lg:grid-cols-12" aria-busy="true">
      <div class="aspect-square animate-pulse bg-board-side lg:col-span-7" />
      <div class="space-y-4 lg:col-span-5">
        <div class="h-16 w-3/4 animate-pulse bg-board-side" />
        <div class="h-4 w-1/3 animate-pulse bg-board-side" />
        <div class="h-10 w-40 animate-pulse bg-board-side" />
        <div class="h-56 animate-pulse bg-board-side" />
      </div>
    </div>

    <EmptyState
      v-else-if="catalogue.error"
      title="Не получилось открыть коробку"
      :description="catalogue.error"
      action-label="Попробовать снова"
      @action="catalogue.load"
    />

    <EmptyState
      v-else-if="!sneaker"
      title="Такой коробки нет"
      description="Возможно, модель убрали со стены или ссылка устарела."
      action-label="Вернуться в каталог"
      @action="router.push('/catalog')"
    />

    <div v-else class="space-y-16 pb-24 lg:pb-0">
      <nav aria-label="Навигация" class="font-mono text-xs uppercase">
        <ol class="flex flex-wrap items-center gap-2">
          <li><RouterLink to="/catalog" class="hover:underline">Каталог</RouterLink></li>
          <li aria-hidden="true">/</li>
          <li>
            <RouterLink
              :to="{ path: '/catalog', query: { category: sneaker.category } }"
              class="hover:underline"
            >
              {{ CATEGORY_LABELS[sneaker.category] }}
            </RouterLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <RouterLink
              :to="{ path: '/catalog', query: { brand: sneaker.brand } }"
              class="hover:underline"
            >
              {{ sneaker.brand }}
            </RouterLink>
          </li>
        </ol>
      </nav>

      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-7">
          <div class="lg:sticky lg:top-28">
            <ProductGallery
              :images="sneaker.images"
              :alt="`${sneakerName(sneaker)}, ${sneaker.colorway}`"
            />
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative">
            <div
              class="absolute inset-0 translate-x-2 translate-y-2 border-rule border-ink bg-board-deep"
              aria-hidden="true"
            />
            <div class="relative flex border-rule border-ink bg-board">
              <span class="notch" aria-hidden="true" />
              <div class="min-w-0 flex-1 p-5 pt-7 sm:p-7 sm:pt-9">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="isOnSale(sneaker)"
                    class="border-rule border-ink bg-brick px-2 py-1 font-mono text-xs font-bold text-tissue"
                  >
                    −{{ salePercent(sneaker) }}%
                  </span>
                  <span
                    v-if="sneaker.isNew"
                    class="border-rule border-ink bg-forest px-2 py-1 font-mono text-xs font-bold uppercase text-tissue"
                  >
                    Новинка
                  </span>
                </div>

                <h1 class="label-caps mt-3 text-5xl sm:text-6xl">
                  {{ sneakerName(sneaker) }}
                </h1>
                <p class="mt-3 font-mono text-sm uppercase">{{ sneaker.colorway }}</p>

                <a
                  href="#reviews-title"
                  class="mt-4 inline-flex items-center gap-2 text-sm hover:underline"
                  @click.prevent="router.replace({ hash: '#reviews-title' })"
                >
                  <RatingStars :rating="sneaker.rating" />
                  <span class="font-mono">{{ sneaker.rating.toFixed(1) }}</span>
                  <span>· {{ sneaker.reviewCount }} отзывов</span>
                </a>

                <p
                  class="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y-rule border-ink py-4 font-mono"
                >
                  <b class="text-4xl">{{ formatPrice(sneaker.price) }}</b>
                  <s v-if="sneaker.oldPrice" class="text-lg">{{ formatPrice(sneaker.oldPrice) }}</s>
                </p>

                <div id="size-picker" class="mt-6">
                  <SizePicker
                    v-model="selectedSize"
                    v-model:system="sizeSystem"
                    :sizes="sneaker.sizes"
                    :has-error="sizeError"
                  />
                  <p v-if="sizeError" class="mt-3 font-semibold" role="alert">
                    Сначала выберите размер.
                  </p>
                  <p
                    v-else-if="selectedSize !== null && selectedStock <= 2"
                    class="mt-3 text-sm"
                    aria-live="polite"
                  >
                    {{ sizeLabel(selectedSize) }} — осталось {{ selectedStock }} шт.
                  </p>
                  <RouterLink
                    to="/#sizes"
                    class="mt-3 inline-flex items-center gap-2 text-sm underline decoration-[1.5px] underline-offset-4"
                  >
                    <UiIcon name="ruler" class="!size-4" /> Таблица размеров
                  </RouterLink>
                </div>

                <div class="mt-6 hidden gap-3 lg:flex">
                  <button
                    v-if="!isSoldOut"
                    type="button"
                    class="btn-solid flex-1 py-4 text-base"
                    @click="addToCart"
                  >
                    <template v-if="justAdded || isSelectedInCart">
                      <UiIcon name="check" /> В корзине · ещё одну
                    </template>
                    <template v-else> <UiIcon name="bag" /> В корзину </template>
                  </button>
                  <p
                    v-else
                    class="flex-1 border-rule border-ink bg-tissue px-4 py-4 text-center font-display uppercase"
                  >
                    Все размеры разобрали
                  </p>
                  <button
                    type="button"
                    :aria-label="
                      favorites.has(sneaker.id) ? 'Убрать из закладок' : 'Добавить в закладки'
                    "
                    :aria-pressed="favorites.has(sneaker.id)"
                    class="grid w-14 place-items-center border-rule border-ink bg-tissue hover:bg-ink hover:text-tissue"
                    :class="favorites.has(sneaker.id) ? 'text-brick' : ''"
                    @click="favorites.toggle(sneaker.id)"
                  >
                    <UiIcon name="heart" :filled="favorites.has(sneaker.id)" />
                  </button>
                </div>

                <p v-if="justAdded" class="mt-3 hidden text-sm lg:block" aria-live="polite">
                  Добавили {{ sizeLabel(selectedSize ?? 0) }}.
                  <RouterLink
                    to="/checkout"
                    class="font-semibold underline decoration-[1.5px] underline-offset-4"
                    >Оформить заказ</RouterLink
                  >
                </p>

                <dl class="mt-6 grid gap-px border-rule border-ink bg-ink text-sm">
                  <div class="flex items-center gap-3 bg-tissue px-4 py-3">
                    <UiIcon name="truck" />
                    <dt class="sr-only">Доставка</dt>
                    <dd>
                      Курьером {{ DELIVERY_OPTIONS.courier.eta }} —
                      {{ formatPrice(DELIVERY_OPTIONS.courier.price) }}, в пункт выдачи бесплатно
                    </dd>
                  </div>
                  <div class="flex items-center gap-3 bg-tissue px-4 py-3">
                    <UiIcon name="returnBox" />
                    <dt class="sr-only">Возврат</dt>
                    <dd>14 дней на возврат, если пара не подошла</dd>
                  </div>
                </dl>
              </div>
              <div class="flex w-4 shrink-0 flex-col border-l-rule border-ink" aria-hidden="true">
                <span
                  v-for="(color, index) in sneaker.colors"
                  :key="`${color}-${index}`"
                  class="flex-1 border-ink [&:not(:last-child)]:border-b"
                  :style="{ backgroundColor: color }"
                />
              </div>
            </div>
          </div>

          <div class="mt-10 border-t-rule border-ink">
            <details class="group border-b-rule border-ink" open>
              <summary
                class="flex cursor-pointer list-none items-center justify-between py-4 font-display text-xl uppercase [&::-webkit-details-marker]:hidden"
              >
                Описание
                <UiIcon
                  name="chevronDown"
                  class="transition-transform duration-pull group-open:rotate-180"
                />
              </summary>
              <p class="max-w-[65ch] pb-6 leading-relaxed">{{ sneaker.description }}</p>
            </details>
            <details class="group border-b-rule border-ink">
              <summary
                class="flex cursor-pointer list-none items-center justify-between py-4 font-display text-xl uppercase [&::-webkit-details-marker]:hidden"
              >
                Характеристики
                <UiIcon
                  name="chevronDown"
                  class="transition-transform duration-pull group-open:rotate-180"
                />
              </summary>
              <dl class="pb-6">
                <div
                  v-for="spec in specs"
                  :key="spec.label"
                  class="flex gap-4 border-b border-ink/30 py-2 text-sm last:border-0"
                >
                  <dt class="w-32 shrink-0 font-mono text-xs uppercase leading-5">
                    {{ spec.label }}
                  </dt>
                  <dd>{{ spec.value }}</dd>
                </div>
              </dl>
            </details>
            <details class="group border-b-rule border-ink">
              <summary
                class="flex cursor-pointer list-none items-center justify-between py-4 font-display text-xl uppercase [&::-webkit-details-marker]:hidden"
              >
                Доставка и возврат
                <UiIcon
                  name="chevronDown"
                  class="transition-transform duration-pull group-open:rotate-180"
                />
              </summary>
              <div class="max-w-[65ch] space-y-3 pb-6 leading-relaxed">
                <p>
                  Курьер привезёт заказ за {{ DELIVERY_OPTIONS.courier.eta }} —
                  {{ formatPrice(DELIVERY_OPTIONS.courier.price) }}. В пункт выдачи доставка
                  бесплатная, срок — {{ DELIVERY_OPTIONS.pickup.eta }}.
                </p>
                <p>
                  Если размер не подошёл, верните пару в течение 14 дней: без следов носки, в
                  коробке и с бирками.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <ProductReviews :sneaker-id="sneaker.id" />

      <section
        v-if="related.length"
        aria-labelledby="related-title"
        class="border-t-rule border-ink pt-10"
      >
        <h2 id="related-title" class="label-caps text-5xl sm:text-6xl">С соседних полок</h2>
        <ProductGrid class="mt-8" :items="related" :columns="4" />
      </section>

      <section
        v-if="recent.length"
        aria-labelledby="recent-title"
        class="border-t-rule border-ink pt-10"
      >
        <h2 id="recent-title" class="label-caps text-4xl sm:text-5xl">Вы смотрели</h2>
        <ProductGrid class="mt-8" :items="recent" :columns="4" />
      </section>

      <div
        class="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t-rule border-ink bg-board px-4 py-3 lg:hidden"
      >
        <div class="min-w-0 flex-1">
          <p class="font-mono text-lg font-bold leading-tight">{{ formatPrice(sneaker.price) }}</p>
          <RouterLink
            v-if="justAdded"
            to="/checkout"
            class="font-mono text-xs font-bold underline underline-offset-2"
            aria-live="polite"
          >
            Добавили · оформить
          </RouterLink>
          <p v-else class="font-mono text-xs">
            {{ selectedSize !== null ? sizeLabel(selectedSize) : 'Размер не выбран' }}
          </p>
        </div>
        <button
          type="button"
          :aria-label="favorites.has(sneaker.id) ? 'Убрать из закладок' : 'Добавить в закладки'"
          :aria-pressed="favorites.has(sneaker.id)"
          class="grid size-12 place-items-center border-rule border-ink bg-tissue"
          :class="favorites.has(sneaker.id) ? 'text-brick' : ''"
          @click="favorites.toggle(sneaker.id)"
        >
          <UiIcon name="heart" :filled="favorites.has(sneaker.id)" />
        </button>
        <button v-if="!isSoldOut" type="button" class="btn-solid py-3.5" @click="addToCart">
          {{ justAdded || isSelectedInCart ? 'Ещё одну' : 'В корзину' }}
        </button>
        <p v-else class="font-display text-sm uppercase">Нет размеров</p>
      </div>
    </div>
  </div>
</template>
