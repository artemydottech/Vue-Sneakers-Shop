<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cartActions')
</script>

<template>
  <div class="flex items-center gap-5 mb-8">
    <button
      @click="closeDrawer"
      class="rounded size-8 flex items-center cursor-pointer opacity-40 hover:opacity-100 transition hover:translate-x-1 close-btn"
    >
      <svg width="18" height="18" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 0.999999L6 6L1 11"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>
</template>
