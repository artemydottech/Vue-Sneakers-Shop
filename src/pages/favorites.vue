<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductGrid from '@/components/product-grid.vue'
import EmptyState from '@/components/empty-state.vue'
import { useCatalogueStore } from '@/stores/catalogue'
import { useFavoritesStore } from '@/stores/favorites'
import { asset } from '@/utils/asset'

const router = useRouter()
const catalogue = useCatalogueStore()
const favorites = useFavoritesStore()

const items = computed(() => catalogue.items.filter((item) => favorites.has(item.id)))
</script>

<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Закладки</h1>
      <p class="mt-1 text-sm text-zinc-500">{{ favorites.count }} отложенных моделей</p>
    </div>

    <ProductGrid v-if="catalogue.isLoading" :items="[]" is-loading />

    <EmptyState
      v-else-if="!items.length"
      title="Закладок пока нет"
      description="Отмечайте понравившиеся пары сердечком, чтобы вернуться к ним позже."
      :image-url="asset('empty-box.png')"
      action-label="Перейти в каталог"
      @action="router.push('/')"
    />

    <ProductGrid v-else :items="items" />
  </section>
</template>
