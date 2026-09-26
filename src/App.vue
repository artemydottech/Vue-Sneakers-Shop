<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import CartDrawer from '@/components/cart-drawer.vue'
import { useCatalogueStore } from '@/stores/catalogue'

const catalogue = useCatalogueStore()
const isCartOpen = ref(false)
const main = ref<Nullable<HTMLElement>>(null)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isCartOpen.value = false
  }
)

onMounted(catalogue.load)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <button
      type="button"
      class="btn-solid fixed left-4 top-4 z-50 -translate-y-24 focus-visible:translate-y-0"
      @click="main?.focus()"
    >
      К содержимому
    </button>

    <AppHeader @open-cart="isCartOpen = true" />

    <main ref="main" tabindex="-1" class="flex-1 focus:outline-none">
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          :enter-from-class="
            route.meta.transition === 'lid' ? '[clip-path:inset(0_0_100%_0)]' : 'opacity-0'
          "
          :enter-active-class="
            route.meta.transition === 'lid'
              ? 'transition-[clip-path] duration-lid ease-pull'
              : 'transition-opacity duration-pull'
          "
          enter-to-class="[clip-path:inset(0_0_0_0)]"
          leave-to-class="opacity-0"
          leave-active-class="transition-opacity duration-100"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <CartDrawer :open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>
