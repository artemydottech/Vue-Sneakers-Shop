<script setup lang="ts">
import CatalogueToolbar from '@/components/catalogue-toolbar.vue'
import ProductGrid from '@/components/product-grid.vue'
import EmptyState from '@/components/empty-state.vue'
import { useCatalogueStore } from '@/stores/catalogue'

const catalogue = useCatalogueStore()

const resetSearch = () => {
  catalogue.search = ''
}
</script>

<template>
  <section class="space-y-8">
    <CatalogueToolbar />

    <EmptyState
      v-if="catalogue.error"
      title="Каталог не загрузился"
      :description="catalogue.error"
      action-label="Попробовать снова"
      @action="catalogue.load"
    />

    <ProductGrid v-else-if="catalogue.isLoading" :items="[]" is-loading />

    <EmptyState
      v-else-if="!catalogue.visibleItems.length"
      title="Ничего не нашлось"
      description="Попробуйте другой запрос или сбросьте поиск."
      action-label="Сбросить поиск"
      @action="resetSearch"
    />

    <ProductGrid v-else :items="catalogue.visibleItems" />
  </section>
</template>
