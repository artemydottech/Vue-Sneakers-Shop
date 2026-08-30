<script setup lang="ts">
import { useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'
import { asset } from '@/utils/asset'

const router = useRouter()
</script>

<template>
  <EmptyState
    title="Страница не найдена"
    description="Такой страницы нет — возможно, ссылка устарела."
    :image-url="asset('empty-box.png')"
    action-label="Вернуться в каталог"
    @action="router.push('/')"
  />
</template>
