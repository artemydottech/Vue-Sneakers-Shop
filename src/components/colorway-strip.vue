<script setup lang="ts">
defineProps<{
  colors: string[]
}>()
</script>

<template>
  <div class="flex w-3.5 shrink-0 flex-col border-l-rule border-ink" aria-hidden="true">
    <span
      v-for="(color, index) in colors"
      :key="`${color}-${index}`"
      class="flex-1 border-ink [&:not(:last-child)]:border-b"
      :style="{ backgroundColor: color }"
    />
  </div>
</template>
