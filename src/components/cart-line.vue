<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { CartLine } from '@/types'
import UiIcon from './ui-icon.vue'
import { formatPrice } from '@/utils/format'
import { formatSize } from '@/utils/sizes'
import { sneakerName } from '@/utils/sneaker'

defineProps<{
  line: CartLine
}>()

const emit = defineEmits<{
  changeQuantity: [key: string, quantity: number]
  remove: [key: string]
  navigate: []
}>()

const MAX_QUANTITY = 5
</script>

<template>
  <li class="flex gap-4 border-b-rule border-ink py-4 first:pt-0">
    <RouterLink
      :to="`/product/${line.id}`"
      class="size-24 shrink-0 overflow-hidden border-rule border-ink"
      @click="emit('navigate')"
    >
      <img :src="line.imageUrl" :alt="`${sneakerName(line)}`" class="size-full object-cover" />
    </RouterLink>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="label-caps text-xl">{{ sneakerName(line) }}</p>
          <p class="mt-1 font-mono text-xs">EU {{ formatSize(line.size) }}</p>
        </div>

        <button
          type="button"
          :aria-label="`Убрать ${line.title}, размер ${formatSize(line.size)}`"
          class="-mr-2 -mt-2 grid size-10 place-items-center hover:bg-ink hover:text-tissue"
          @click="emit('remove', line.key)"
        >
          <UiIcon name="close" />
        </button>
      </div>

      <div class="mt-auto flex items-center justify-between gap-3 pt-3">
        <div class="flex items-center border-rule border-ink">
          <button
            type="button"
            aria-label="Меньше"
            class="grid size-9 place-items-center hover:bg-ink hover:text-tissue"
            @click="emit('changeQuantity', line.key, line.quantity - 1)"
          >
            <UiIcon name="minus" />
          </button>
          <span class="w-8 text-center font-mono text-sm" aria-live="polite">{{
            line.quantity
          }}</span>
          <button
            type="button"
            aria-label="Больше"
            :disabled="line.quantity >= MAX_QUANTITY"
            class="grid size-9 place-items-center hover:bg-ink hover:text-tissue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
            @click="emit('changeQuantity', line.key, line.quantity + 1)"
          >
            <UiIcon name="plus" />
          </button>
        </div>

        <b class="font-mono">{{ formatPrice(line.price * line.quantity) }}</b>
      </div>
    </div>
  </li>
</template>
