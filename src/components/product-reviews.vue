<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FIT_LABELS, type Fit, type Review } from '@/types'
import RatingStars from './rating-stars.vue'
import { getReviews } from '@/services/api/reviews'
import { errorMessage } from '@/utils/error'
import { formatSize } from '@/utils/sizes'

const props = defineProps<{
  sneakerId: number
}>()

const PAGE_SIZE = 4
const reviewDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

const reviews = ref<Review[]>([])
const isLoading = ref(true)
const error = ref<Nullable<string>>(null)
const visibleCount = ref(PAGE_SIZE)

const load = async () => {
  isLoading.value = true
  error.value = null
  visibleCount.value = PAGE_SIZE

  try {
    reviews.value = await getReviews(props.sneakerId)
  } catch (loadError) {
    error.value = errorMessage(loadError, 'Не удалось загрузить отзывы')
  } finally {
    isLoading.value = false
  }
}

watch(() => props.sneakerId, load, { immediate: true })

const average = computed(() =>
  reviews.value.length
    ? reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length
    : 0
)

const distribution = computed(() =>
  [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.value.filter((review) => review.rating === stars).length
    return { stars, count, share: reviews.value.length ? count / reviews.value.length : 0 }
  })
)

const fitSummary = computed(() => {
  const counts = reviews.value.reduce<Record<Fit, number>>(
    (acc, review) => ({ ...acc, [review.fit]: acc[review.fit] + 1 }),
    { small: 0, true: 0, large: 0 }
  )
  const [topFit] = (Object.keys(counts) as Fit[]).sort((a, b) => counts[b] - counts[a])
  return topFit
    ? { fit: topFit, share: Math.round((counts[topFit] / reviews.value.length) * 100) }
    : null
})

const visibleReviews = computed(() => reviews.value.slice(0, visibleCount.value))
</script>

<template>
  <section aria-labelledby="reviews-title" class="border-t-rule border-ink pt-10">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 id="reviews-title" class="label-caps text-5xl sm:text-6xl">Отзывы</h2>
      <p class="font-mono text-xs">Демонстрационные отзывы, сгенерированы для макета</p>
    </div>

    <div v-if="isLoading" class="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]" aria-busy="true">
      <div class="h-48 animate-pulse bg-board-side" />
      <div class="space-y-4">
        <div v-for="index in 3" :key="index" class="h-28 animate-pulse bg-board-side" />
      </div>
    </div>

    <div v-else-if="error" class="mt-8 flex flex-wrap items-center gap-4">
      <p>{{ error }}</p>
      <button type="button" class="btn-line" @click="load">Попробовать снова</button>
    </div>

    <p v-else-if="!reviews.length" class="mt-8 text-lg">
      Отзывов пока нет — эта пара только приехала на полку.
    </p>

    <div v-else class="mt-8 grid gap-10 lg:grid-cols-[320px_1fr]">
      <div class="self-start border-rule border-ink bg-tissue p-6">
        <p class="flex items-baseline gap-3">
          <span class="font-mono text-6xl font-bold leading-none">{{ average.toFixed(1) }}</span>
          <span class="font-mono text-sm">из 5</span>
        </p>
        <RatingStars :rating="average" class="mt-3" />
        <p class="mt-1 font-mono text-xs">{{ reviews.length }} оценок</p>

        <ul class="mt-6 space-y-2" aria-label="Распределение оценок">
          <li
            v-for="row in distribution"
            :key="row.stars"
            class="flex items-center gap-3 font-mono text-xs"
          >
            <span class="w-3">{{ row.stars }}</span>
            <span class="h-2.5 flex-1 border border-ink" aria-hidden="true">
              <span class="block h-full bg-ink" :style="{ width: `${row.share * 100}%` }" />
            </span>
            <span class="w-5 text-right">{{ row.count }}</span>
          </li>
        </ul>

        <p v-if="fitSummary" class="mt-6 border-t-rule border-ink pt-4">
          <b class="label-caps text-2xl">{{ FIT_LABELS[fitSummary.fit] }}</b>
          <span class="mt-1 block text-sm">так считают {{ fitSummary.share }}% покупателей</span>
        </p>
      </div>

      <div>
        <ul class="divide-y-[1.5px] divide-ink border-y-rule border-ink">
          <li
            v-for="review in visibleReviews"
            :key="review.id"
            class="grid gap-3 py-6 sm:grid-cols-[180px_1fr]"
          >
            <div>
              <p class="font-display text-lg uppercase">{{ review.author }}</p>
              <p class="text-sm">{{ review.city }}</p>
              <p class="mt-2 font-mono text-xs">
                {{ reviewDateFormatter.format(new Date(review.createdAt)) }}
              </p>
            </div>
            <div>
              <RatingStars :rating="review.rating" />
              <p class="mt-3 max-w-[65ch] leading-relaxed">{{ review.text }}</p>
              <p class="mt-3 font-mono text-xs">
                Размер EU {{ formatSize(review.size) }} · {{ FIT_LABELS[review.fit] }}
              </p>
            </div>
          </li>
        </ul>

        <button
          v-if="visibleCount < reviews.length"
          type="button"
          class="btn-line mt-6"
          @click="visibleCount += PAGE_SIZE"
        >
          Показать ещё {{ Math.min(PAGE_SIZE, reviews.length - visibleCount) }}
        </button>
      </div>
    </div>
  </section>
</template>
