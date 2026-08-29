<script setup lang="ts">
defineProps<{
  title: string
  description: string
  imageUrl?: string
  actionLabel?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="mx-auto flex max-w-sm flex-col items-center px-6 py-16 text-center">
    <img v-if="imageUrl" :src="imageUrl" alt="" class="mb-6 size-28 object-contain opacity-90" />

    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <p class="mt-2 text-sm text-zinc-500">{{ description }}</p>

    <button
      v-if="actionLabel"
      type="button"
      class="mt-7 w-full rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-dark"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
