<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CartLineRow from './cart-line.vue'
import UiIcon from './ui-icon.vue'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const cart = useCartStore()
const closeButton = ref<Nullable<HTMLButtonElement>>(null)

const goTo = (path: string) => {
  emit('close')
  router.push(path)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  async (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButton.value?.focus()
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-lid"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity duration-pull"
    >
      <div v-if="open" class="fixed inset-0 z-40 bg-ink/60" @click="emit('close')" />
    </Transition>

    <Transition
      enter-from-class="translate-x-full"
      enter-active-class="transition-transform duration-lid ease-pull"
      leave-to-class="translate-x-full"
      leave-active-class="transition-transform duration-pull ease-pull"
    >
      <aside
        v-if="open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        class="fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l-rule border-ink bg-tissue"
      >
        <div class="flex items-center justify-between border-b-rule border-ink bg-board px-6 py-4">
          <h2 id="cart-title" class="label-caps text-3xl">
            Корзина <span class="font-mono text-base font-bold">{{ cart.count }}</span>
          </h2>
          <button
            ref="closeButton"
            type="button"
            aria-label="Закрыть корзину"
            class="grid size-10 place-items-center border-rule border-ink hover:bg-ink hover:text-tissue"
            @click="emit('close')"
          >
            <UiIcon name="close" />
          </button>
        </div>

        <div
          v-if="cart.isEmpty"
          class="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"
        >
          <p class="label-caps text-4xl">Пока пусто</p>
          <p class="max-w-[30ch]">Выберите пару и размер — коробка появится здесь.</p>
          <button type="button" class="btn-solid mt-4" @click="goTo('/catalog')">
            Открыть каталог
          </button>
        </div>

        <template v-else>
          <ul class="flex-1 overflow-y-auto px-6 py-5">
            <CartLineRow
              v-for="line in cart.lines"
              :key="line.key"
              :line="line"
              @change-quantity="cart.setQuantity"
              @remove="cart.remove"
              @navigate="emit('close')"
            />
          </ul>

          <div class="space-y-4 border-t-rule border-ink px-6 py-5">
            <p class="flex items-baseline justify-between gap-3">
              <span>Товары на сумму</span>
              <b class="font-mono text-xl">{{ formatPrice(cart.subtotal) }}</b>
            </p>
            <p class="text-sm">Доставку посчитаем на следующем шаге.</p>

            <button
              type="button"
              class="btn-solid w-full py-4 text-base"
              @click="goTo('/checkout')"
            >
              Перейти к оформлению
              <UiIcon name="arrowRight" />
            </button>
          </div>
        </template>
      </aside>
    </Transition>
  </Teleport>
</template>
