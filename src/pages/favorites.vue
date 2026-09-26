<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductGrid from '@/components/product-grid.vue'
import EmptyState from '@/components/empty-state.vue'
import { useCatalogueStore } from '@/stores/catalogue'
import { useFavoritesStore } from '@/stores/favorites'

const router = useRouter()
const catalogue = useCatalogueStore()
const favorites = useFavoritesStore()

const items = computed(() => catalogue.byIds(favorites.ids))
</script>

<template>
  <section class="container-page py-10 lg:py-14">
    <div class="flex flex-wrap items-end justify-between gap-4 border-b-rule border-ink pb-6">
      <h1 class="label-caps text-6xl sm:text-7xl">Закладки</h1>
      <p v-if="items.length" class="font-mono text-sm">{{ items.length }} отложено</p>
    </div>

    <div class="mt-8">
      <EmptyState
        v-if="catalogue.error"
        title="Не загрузилось"
        :description="catalogue.error"
        action-label="Попробовать снова"
        @action="catalogue.load"
      />

      <ProductGrid v-else-if="catalogue.isLoading" :items="[]" is-loading :skeleton-count="4" />

      <EmptyState
        v-else-if="!items.length"
        title="Закладок пока нет"
        description="Жмите на сердце на коробке, чтобы отложить пару и вернуться к ней позже."
        action-label="Открыть каталог"
        @action="router.push('/catalog')"
      />

      <ProductGrid v-else :items="items" show-sizes />
    </div>
  </section>
</template>
