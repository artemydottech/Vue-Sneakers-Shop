<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Sneaker } from '@/types'
import ColorwayStrip from './colorway-strip.vue'
import SizeRun from './size-run.vue'
import UiIcon from './ui-icon.vue'
import { isOnSale, salePercent } from '@/utils/catalogue-filters'
import { formatPrice } from '@/utils/format'
import { sneakerName } from '@/utils/sneaker'

defineProps<{
  sneaker: Sneaker
  isFavorite: boolean
  showSizes?: boolean
}>()

const emit = defineEmits<{
  toggleFavorite: [id: number]
}>()
</script>

<template>
  <article class="group relative">
    <div class="absolute inset-0 border-rule border-ink bg-board-deep" aria-hidden="true" />

    <div
      class="relative flex h-full flex-col border-rule border-ink bg-board transition-transform duration-pull ease-pull group-focus-within:-translate-x-1.5 group-focus-within:-translate-y-1.5 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
    >
      <div class="relative border-b-rule border-ink bg-tissue p-2.5">
        <div class="aspect-[5/4] overflow-hidden border-rule border-ink">
          <img
            :src="sneaker.imageUrl"
            :alt="`${sneakerName(sneaker)}, ${sneaker.colorway}`"
            loading="lazy"
            decoding="async"
            class="size-full object-cover transition-transform duration-lid ease-pull group-hover:scale-[1.03]"
          />
        </div>

        <div class="absolute left-0 top-0 flex">
          <span
            v-if="isOnSale(sneaker)"
            class="border-b-rule border-r-rule border-ink bg-brick px-2 py-1 font-mono text-xs font-bold text-tissue"
          >
            −{{ salePercent(sneaker) }}%
          </span>
          <span
            v-if="sneaker.isNew"
            class="border-b-rule border-r-rule border-ink bg-forest px-2 py-1 font-mono text-xs font-bold uppercase text-tissue"
          >
            Новинка
          </span>
        </div>

        <button
          type="button"
          :aria-label="isFavorite ? 'Убрать из закладок' : 'Добавить в закладки'"
          :aria-pressed="isFavorite"
          class="absolute right-0 top-0 z-20 grid size-10 place-items-center border-b-rule border-l-rule border-ink bg-tissue transition-colors hover:bg-ink hover:text-tissue"
          :class="isFavorite ? 'text-brick' : 'text-ink'"
          @click="emit('toggleFavorite', sneaker.id)"
        >
          <UiIcon name="heart" :filled="isFavorite" />
        </button>
      </div>

      <div class="relative flex flex-1">
        <span class="notch" aria-hidden="true" />
        <div class="flex min-w-0 flex-1 flex-col gap-2 p-4 pt-5">
          <h3 class="label-caps text-2xl">
            <RouterLink
              :to="`/product/${sneaker.id}`"
              class="after:absolute after:inset-0 after:z-10 focus-visible:outline-none"
            >
              {{ sneakerName(sneaker) }}
            </RouterLink>
          </h3>
          <p class="font-mono text-xs uppercase">{{ sneaker.colorway }}</p>

          <SizeRun v-if="showSizes" :sizes="sneaker.sizes" class="mt-1" />

          <p class="mt-auto flex items-baseline gap-3 pt-2 font-mono">
            <b class="text-lg">{{ formatPrice(sneaker.price) }}</b>
            <s v-if="sneaker.oldPrice" class="text-sm">{{ formatPrice(sneaker.oldPrice) }}</s>
          </p>
        </div>

        <ColorwayStrip :colors="sneaker.colors" />
      </div>
    </div>
  </article>
</template>
