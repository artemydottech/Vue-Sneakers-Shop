<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Sneaker } from '@/types'
import ColorwayStrip from './colorway-strip.vue'
import { formatPrice } from '@/utils/format'
import { sneakerName } from '@/utils/sneaker'

defineProps<{
  sneaker: Sneaker
}>()
</script>

<template>
  <RouterLink
    :to="`/product/${sneaker.id}`"
    class="group relative block h-full focus-visible:outline-none"
    :aria-label="`${sneakerName(sneaker)}, ${formatPrice(sneaker.price)}`"
  >
    <span class="absolute inset-0 border-rule border-ink bg-board-deep" aria-hidden="true" />
    <span
      class="relative flex h-full border-rule border-ink bg-board transition-transform duration-pull ease-pull group-hover:-translate-x-1 group-hover:-translate-y-1 group-focus-visible:-translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-ink"
    >
      <span class="notch" aria-hidden="true" />
      <span class="flex min-w-0 flex-1 flex-col justify-between gap-1 p-2.5 pt-3.5">
        <span class="label-caps line-clamp-2 text-base !leading-[1.1] xl:text-lg">{{
          sneaker.title
        }}</span>
        <span class="truncate font-mono text-[10px] uppercase">{{ sneaker.colorway }}</span>
      </span>
      <span class="relative hidden w-2/5 border-l-rule border-ink sm:block" aria-hidden="true">
        <img
          :src="sneaker.imageUrl"
          alt=""
          loading="lazy"
          class="absolute inset-0 size-full object-cover"
        />
      </span>
      <ColorwayStrip :colors="sneaker.colors" />
    </span>
  </RouterLink>
</template>
