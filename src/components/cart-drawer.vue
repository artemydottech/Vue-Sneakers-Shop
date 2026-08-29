<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Order } from '@/types'
import CartLineRow from './cart-line.vue'
import { useCartStore } from '@/stores/cart'
import { useOrdersStore } from '@/stores/orders'
import { asset } from '@/utils/asset'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const cart = useCartStore()
const orders = useOrdersStore()

const placedOrder = ref<Nullable<Order>>(null)

const submit = async () => {
  const order = await orders.place(cart.lines, cart.total)
  if (!order) return

  placedOrder.value = order
  cart.clear()
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) placedOrder.value = null
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-300"
      leave-to-class="opacity-0"
      leave-active-class="transition duration-200"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-from-class="translate-x-full"
      enter-active-class="transition duration-400 ease-smooth"
      leave-to-class="translate-x-full"
      leave-active-class="transition duration-300 ease-smooth"
    >
      <aside
        v-if="open"
        class="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-ink text-white"
      >
        <div class="flex items-center justify-between border-b border-ink-line px-6 py-5">
          <h2 class="text-lg font-semibold">Корзина</h2>
          <button
            type="button"
            aria-label="Закрыть корзину"
            class="grid size-9 place-items-center rounded-full bg-ink-soft text-ink-muted transition hover:text-white"
            @click="emit('close')"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="size-4"
            >
              <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div
          v-if="placedOrder"
          class="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center"
        >
          <div class="grid size-14 place-items-center rounded-full bg-accent text-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              class="size-6"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold">Заказ оформлен</h3>
          <p class="text-sm text-ink-muted">
            На {{ formatPrice(placedOrder.total) }}. Найдёте его на вкладке «Заказы».
          </p>
          <button
            type="button"
            class="mt-4 w-full rounded-2xl bg-ink-soft py-3 text-sm font-semibold transition hover:bg-ink-line"
            @click="emit('close')"
          >
            Вернуться в каталог
          </button>
        </div>

        <div
          v-else-if="cart.isEmpty"
          class="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center"
        >
          <img :src="asset('empty-box.png')" alt="" class="size-24 object-contain" />
          <h3 class="text-xl font-semibold">Корзина пустая</h3>
          <p class="text-sm text-ink-muted">Добавьте хотя бы одну пару, чтобы оформить заказ.</p>
          <button
            type="button"
            class="mt-4 w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-ink transition hover:bg-accent-dark"
            @click="emit('close')"
          >
            Перейти к покупкам
          </button>
        </div>

        <template v-else>
          <TransitionGroup
            tag="div"
            class="flex-1 space-y-3 overflow-y-auto px-6 py-5"
            enter-from-class="opacity-0 -translate-x-3"
            enter-active-class="transition duration-300 ease-smooth"
            leave-to-class="opacity-0 translate-x-6"
            leave-active-class="transition duration-200 ease-smooth"
          >
            <CartLineRow
              v-for="line in cart.lines"
              :key="line.id"
              :line="line"
              @change-quantity="cart.setQuantity"
              @remove="cart.remove"
            />
          </TransitionGroup>

          <div class="space-y-4 border-t border-ink-line px-6 py-5">
            <div class="flex items-center gap-3 text-sm text-ink-muted">
              <span>Товары</span>
              <span class="flex-1 border-b border-dashed border-ink-line" />
              <b class="tabular-nums text-white">{{ formatPrice(cart.subtotal) }}</b>
            </div>

            <div class="flex items-center gap-3 text-sm text-ink-muted">
              <span>Налог 5%</span>
              <span class="flex-1 border-b border-dashed border-ink-line" />
              <b class="tabular-nums text-white">{{ formatPrice(cart.vat) }}</b>
            </div>

            <p v-if="orders.error" class="text-sm text-rose-400">{{ orders.error }}</p>

            <button
              type="button"
              :disabled="orders.isSubmitting"
              class="w-full rounded-2xl bg-accent py-3.5 text-sm font-semibold text-ink transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-ink-line disabled:text-ink-muted"
              @click="submit"
            >
              {{ orders.isSubmitting ? 'Оформляем…' : `Оформить за ${formatPrice(cart.total)}` }}
            </button>
          </div>
        </template>
      </aside>
    </Transition>
  </Teleport>
</template>
