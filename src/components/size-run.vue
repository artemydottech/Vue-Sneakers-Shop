<script setup lang="ts">
import { computed } from 'vue'
import type { SizeStock } from '@/types'
import { formatSize } from '@/utils/sizes'

const props = defineProps<{
  sizes: SizeStock[]
}>()

const inStock = computed(() => props.sizes.filter((size) => size.stock > 0))
</script>

<template>
  <p class="font-mono text-[11px] leading-5">
    <span class="sr-only">
      В наличии размеры EU: {{ inStock.map((size) => formatSize(size.eu)).join(', ') }}
    </span>
    <span aria-hidden="true" class="flex flex-wrap gap-x-2">
      <span
        v-for="size in sizes"
        :key="size.eu"
        :class="size.stock > 0 ? '' : 'line-through decoration-1'"
      >
        {{ formatSize(size.eu) }}
      </span>
    </span>
  </p>
</template>
