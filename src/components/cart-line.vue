<script setup lang="ts">
import type { CartLine } from '@/types'
import { formatPrice } from '@/utils/format'

defineProps<{
  line: CartLine
}>()

const emit = defineEmits<{
  changeQuantity: [id: number, quantity: number]
  remove: [id: number]
}>()
</script>

<template>
  <div class="flex gap-4 rounded-3xl border border-ink-line bg-ink-soft p-3">
    <div class="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white">
      <img :src="line.imageUrl" :alt="line.title" class="size-full object-contain p-2" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col justify-between">
      <div class="flex items-start justify-between gap-3">
        <p class="truncate text-sm text-white">{{ line.title }}</p>

        <button
          type="button"
          aria-label="Убрать из корзины"
          class="text-ink-muted transition hover:text-white"
          @click="emit('remove', line.id)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="size-4"
          >
            <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-1 rounded-full border border-ink-line">
          <button
            type="button"
            aria-label="Уменьшить количество"
            class="grid size-7 place-items-center rounded-full text-ink-muted transition hover:text-white"
            @click="emit('changeQuantity', line.id, line.quantity - 1)"
          >
            −
          </button>
          <span class="w-5 text-center text-xs tabular-nums text-white">{{ line.quantity }}</span>
          <button
            type="button"
            aria-label="Увеличить количество"
            class="grid size-7 place-items-center rounded-full text-ink-muted transition hover:text-white"
            @click="emit('changeQuantity', line.id, line.quantity + 1)"
          >
            +
          </button>
        </div>

        <b class="text-sm tabular-nums text-white">{{ formatPrice(line.price * line.quantity) }}</b>
      </div>
    </div>
  </div>
</template>
