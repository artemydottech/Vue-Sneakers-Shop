<script setup lang="ts">
defineProps<{
  title: string
  description: string
  actionLabel?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
    <svg
      viewBox="0 0 160 110"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
      class="mb-8 w-40 text-ink"
    >
      <path d="M20 44h120v58H20z" class="fill-board-side" />
      <path d="M20 44 34 20h120l-14 24" class="fill-board" />
      <path d="M140 44l14-24v58l-14 24" class="fill-board-deep" />
      <path d="M34 20 20 44" />
      <path d="M58 44c4 10 10 14 22 14s18-4 22-14" />
      <path d="M36 56h24M36 64h16M36 72h20" stroke-width="1.2" />
      <path d="M108 60h20v24h-20z" class="fill-tissue" />
      <path d="M112 66h12M112 72h12M112 78h8" stroke-width="1" />
    </svg>

    <h2 class="label-caps text-4xl sm:text-5xl">{{ title }}</h2>
    <p class="mt-4 max-w-[36ch] text-base">{{ description }}</p>

    <button v-if="actionLabel" type="button" class="btn-solid mt-8" @click="emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>
