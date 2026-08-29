<script setup lang="ts">
import { useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'
import { useOrdersStore } from '@/stores/orders'
import { formatDate, formatPrice } from '@/utils/format'

const router = useRouter()
const orders = useOrdersStore()
</script>

<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Заказы</h1>
      <p class="mt-1 text-sm text-zinc-500">{{ orders.count }} оформленных заказов</p>
    </div>

    <EmptyState
      v-if="!orders.count"
      title="Заказов ещё не было"
      description="Соберите корзину и оформите первый заказ."
      image-url="/package-icon.png"
      action-label="Перейти в каталог"
      @action="router.push('/')"
    />

    <ul v-else class="space-y-4">
      <li
        v-for="order in orders.orders"
        :key="order.id"
        class="overflow-hidden rounded-4xl border border-zinc-200 bg-white"
      >
        <div
          class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-6 py-4"
        >
          <div>
            <p class="text-sm font-medium">Заказ №{{ order.id.slice(0, 8) }}</p>
            <p class="text-xs text-zinc-500">{{ formatDate(order.createdAt) }}</p>
          </div>
          <b class="tabular-nums">{{ formatPrice(order.total) }}</b>
        </div>

        <div class="flex flex-wrap gap-3 px-6 py-4">
          <div
            v-for="line in order.items"
            :key="line.id"
            class="grid size-16 place-items-center rounded-2xl bg-zinc-50"
            :title="`${line.title} × ${line.quantity}`"
          >
            <img :src="line.imageUrl" :alt="line.title" class="size-full object-contain p-1.5" />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
