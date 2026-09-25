<script setup lang="ts">
import UiIcon from './ui-icon.vue'

defineProps<{
  rating: number
}>()

const STARS = [1, 2, 3, 4, 5] as const
</script>

<template>
  <span
    class="inline-flex items-center gap-0.5"
    :aria-label="`Оценка ${rating.toFixed(1)} из 5`"
    role="img"
  >
    <UiIcon
      v-for="star in STARS"
      :key="star"
      name="star"
      :filled="rating >= star - 0.25"
      class="!size-4"
    />
  </span>
</template>
