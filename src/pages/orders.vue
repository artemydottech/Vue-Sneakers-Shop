<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'
import { useOrdersStore } from '@/stores/orders'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from '@/types'
import { formatDate, formatPrice } from '@/utils/format'
import { formatSize } from '@/utils/sizes'
import { sneakerName } from '@/utils/sneaker'

const router = useRouter()
const orders = useOrdersStore()
</script>

<template>
  <section class="container-page py-10 lg:py-14">
    <div class="flex flex-wrap items-end justify-between gap-4 border-b-rule border-ink pb-6">
      <h1 class="label-caps text-6xl sm:text-7xl">Заказы</h1>
      <p v-if="orders.count" class="font-mono text-sm">{{ orders.count }} оформлено</p>
    </div>

    <EmptyState
      v-if="!orders.count"
      title="Заказов ещё не было"
      description="Соберите корзину и оформите первый заказ — он появится здесь."
      action-label="Открыть каталог"
      @action="router.push('/catalog')"
    />

    <ul v-else class="mt-8 space-y-8">
      <li v-for="order in orders.orders" :key="order.id" class="relative">
        <div
          class="absolute inset-0 translate-x-2 translate-y-2 border-rule border-ink bg-board-deep"
          aria-hidden="true"
        />
        <article class="relative border-rule border-ink bg-tissue">
          <header
            class="flex flex-wrap items-center justify-between gap-3 border-b-rule border-ink bg-board px-5 py-4"
          >
            <div>
              <h2 class="label-caps text-2xl">Заказ № {{ order.id.slice(0, 8).toUpperCase() }}</h2>
              <p class="font-mono text-xs">{{ formatDate(order.createdAt) }}</p>
            </div>
            <b class="font-mono text-xl">{{ formatPrice(order.total) }}</b>
          </header>

          <ul class="divide-y divide-ink/30 px-5">
            <li v-for="line in order.items" :key="line.key" class="flex items-center gap-4 py-3">
              <RouterLink :to="`/product/${line.id}`" class="shrink-0">
                <img
                  :src="line.imageUrl"
                  :alt="`${sneakerName(line)}`"
                  class="size-16 border-rule border-ink object-cover"
                />
              </RouterLink>
              <div class="min-w-0 flex-1">
                <RouterLink :to="`/product/${line.id}`" class="font-medium hover:underline">
                  {{ sneakerName(line) }}
                </RouterLink>
                <p class="font-mono text-xs">
                  EU {{ formatSize(line.size) }} × {{ line.quantity }}
                </p>
              </div>
              <span class="font-mono text-sm">{{ formatPrice(line.price * line.quantity) }}</span>
            </li>
          </ul>

          <footer class="flex flex-wrap gap-x-8 gap-y-2 border-t-rule border-ink px-5 py-3 text-sm">
            <span
              >{{ DELIVERY_OPTIONS[order.delivery].label }}: {{ order.customer.city }},
              {{ order.customer.address }}</span
            >
            <span>{{ PAYMENT_OPTIONS[order.payment] }}</span>
          </footer>
        </article>
      </li>
    </ul>
  </section>
</template>
