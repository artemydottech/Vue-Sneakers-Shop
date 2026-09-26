<script setup lang="ts">
import { useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'

const router = useRouter()
</script>

<template>
  <div class="container-page py-10">
    <EmptyState
      title="Такой полки нет"
      description="Страница не найдена — возможно, ссылка устарела."
      action-label="На главную"
      @action="router.push('/')"
    />
  </div>
</template>
