<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import CartDrawer from '@/components/cart-drawer.vue'
import { useCatalogueStore } from '@/stores/catalogue'

const catalogue = useCatalogueStore()
const isCartOpen = ref(false)

onMounted(catalogue.load)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader @open-cart="isCartOpen = true" />

    <main class="container-page flex-1 py-10 sm:py-14">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-from-class="opacity-0 translate-y-2"
          enter-active-class="transition duration-300 ease-smooth"
          leave-to-class="opacity-0"
          leave-active-class="transition duration-150"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <CartDrawer :open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>
