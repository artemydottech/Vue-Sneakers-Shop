<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import EmptyState from '@/components/empty-state.vue'
import UiIcon from '@/components/ui-icon.vue'
import { useCartStore } from '@/stores/cart'
import { useOrdersStore } from '@/stores/orders'
import {
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS,
  type Customer,
  type DeliveryMethod,
  type Order,
  type PaymentMethod
} from '@/types'
import { formatPhone, validateCustomer, type CustomerErrors } from '@/utils/checkout'
import { formatPrice } from '@/utils/format'
import { formatSize } from '@/utils/sizes'
import { sneakerName } from '@/utils/sneaker'

const router = useRouter()
const cart = useCartStore()
const orders = useOrdersStore()

const customer = reactive<Customer>({
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  comment: ''
})
const delivery = ref<DeliveryMethod>('courier')
const payment = ref<PaymentMethod>('card')
const errors = ref<CustomerErrors>({})
const wasSubmitted = ref(false)
const placedOrder = ref<Nullable<Order>>(null)

const deliveryPrice = computed(() => DELIVERY_OPTIONS[delivery.value].price)
const total = computed(() => cart.subtotal + deliveryPrice.value)

watch([customer, delivery], () => {
  if (wasSubmitted.value) errors.value = validateCustomer(customer, delivery.value)
})

const onPhoneInput = (event: Event) => {
  customer.phone = formatPhone((event.target as HTMLInputElement).value)
}

const submit = async () => {
  wasSubmitted.value = true
  errors.value = validateCustomer(customer, delivery.value)

  const [firstInvalid] = Object.keys(errors.value)
  if (firstInvalid) {
    await nextTick()
    document.getElementById(`field-${firstInvalid}`)?.focus()
    return
  }

  const order = await orders.place({
    items: cart.lines.map((line) => ({ ...line })),
    subtotal: cart.subtotal,
    deliveryPrice: deliveryPrice.value,
    total: total.value,
    customer: { ...customer },
    delivery: delivery.value,
    payment: payment.value
  })

  if (!order) return

  placedOrder.value = order
  cart.clear()
  window.scrollTo({ top: 0 })
}

const FIELDS: {
  key: keyof Customer
  label: string
  type: string
  autocomplete: string
  placeholder: string
}[] = [
  {
    key: 'name',
    label: 'Имя и фамилия',
    type: 'text',
    autocomplete: 'name',
    placeholder: 'Анна Смирнова'
  },
  {
    key: 'email',
    label: 'Почта',
    type: 'email',
    autocomplete: 'email',
    placeholder: 'anna@example.ru'
  },
  {
    key: 'city',
    label: 'Город',
    type: 'text',
    autocomplete: 'address-level2',
    placeholder: 'Екатеринбург'
  }
]

const orderNumber = (orderId: string) => orderId.slice(0, 8).toUpperCase()
</script>

<template>
  <div class="container-page py-10 lg:py-14">
    <section v-if="placedOrder" class="mx-auto max-w-2xl" aria-labelledby="done-title">
      <div class="relative">
        <div
          class="absolute inset-0 translate-x-2 translate-y-2 border-rule border-ink bg-board-deep"
          aria-hidden="true"
        />
        <div class="relative border-rule border-ink bg-tissue p-6 sm:p-10">
          <span class="notch !bg-tissue" aria-hidden="true" />
          <p class="font-mono text-sm">Заказ № {{ orderNumber(placedOrder.id) }}</p>
          <h1 id="done-title" class="label-caps mt-3 text-5xl sm:text-6xl">Коробки собраны</h1>
          <p class="mt-4 max-w-[48ch] text-lg leading-relaxed">
            {{ placedOrder.customer.name }}, заказ на {{ formatPrice(placedOrder.total) }} принят.
            Это учебный магазин — никто не приедет, но заказ сохранился в разделе «Заказы».
          </p>

          <ul class="mt-8 divide-y divide-ink/30 border-y-rule border-ink">
            <li
              v-for="line in placedOrder.items"
              :key="line.key"
              class="flex items-center gap-4 py-3"
            >
              <img
                :src="line.imageUrl"
                alt=""
                class="size-14 border-rule border-ink object-cover"
              />
              <span class="flex-1"
                >{{ sneakerName(line) }} · EU {{ formatSize(line.size) }} ×
                {{ line.quantity }}</span
              >
              <b class="font-mono">{{ formatPrice(line.price * line.quantity) }}</b>
            </li>
          </ul>

          <dl class="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt class="font-mono text-xs uppercase">Доставка</dt>
              <dd>
                {{ DELIVERY_OPTIONS[placedOrder.delivery].label }}, {{ placedOrder.customer.city }},
                {{ placedOrder.customer.address }}
              </dd>
            </div>
            <div>
              <dt class="font-mono text-xs uppercase">Оплата</dt>
              <dd>{{ PAYMENT_OPTIONS[placedOrder.payment] }}</dd>
            </div>
          </dl>

          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/orders" class="btn-solid">Мои заказы</RouterLink>
            <RouterLink to="/catalog" class="btn-line">Вернуться в каталог</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <EmptyState
      v-else-if="cart.isEmpty"
      title="Оформлять нечего"
      description="В корзине пусто. Выберите пару и размер — и возвращайтесь сюда."
      action-label="Открыть каталог"
      @action="router.push('/catalog')"
    />

    <template v-else>
      <h1 class="label-caps border-b-rule border-ink pb-6 text-6xl sm:text-7xl">Оформление</h1>

      <form class="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]" novalidate @submit.prevent="submit">
        <div class="space-y-12">
          <fieldset>
            <legend class="label-caps text-3xl">Получатель</legend>
            <div class="mt-5 grid gap-5 sm:grid-cols-2">
              <label
                v-for="field in FIELDS"
                :key="field.key"
                class="block"
                :class="field.key === 'name' ? 'sm:col-span-2' : ''"
              >
                <span class="mb-1.5 block text-sm font-medium">{{ field.label }}</span>
                <input
                  :id="`field-${field.key}`"
                  v-model="customer[field.key]"
                  :type="field.type"
                  :autocomplete="field.autocomplete"
                  :placeholder="field.placeholder"
                  :aria-invalid="Boolean(errors[field.key])"
                  :aria-describedby="errors[field.key] ? `error-${field.key}` : undefined"
                  class="field"
                  :class="
                    errors[field.key] ? 'outline outline-2 outline-offset-0 outline-brick' : ''
                  "
                />
                <span
                  v-if="errors[field.key]"
                  :id="`error-${field.key}`"
                  class="mt-1.5 block text-sm font-semibold"
                >
                  {{ errors[field.key] }}
                </span>
              </label>

              <label class="block">
                <span class="mb-1.5 block text-sm font-medium">Телефон</span>
                <input
                  id="field-phone"
                  :value="customer.phone"
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder="+7 (900) 000-00-00"
                  :aria-invalid="Boolean(errors.phone)"
                  :aria-describedby="errors.phone ? 'error-phone' : undefined"
                  class="field font-mono"
                  :class="errors.phone ? 'outline outline-2 outline-offset-0 outline-brick' : ''"
                  @input="onPhoneInput"
                />
                <span
                  v-if="errors.phone"
                  id="error-phone"
                  class="mt-1.5 block text-sm font-semibold"
                  >{{ errors.phone }}</span
                >
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend class="label-caps text-3xl">Доставка</legend>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <label
                v-for="(option, key) in DELIVERY_OPTIONS"
                :key="key"
                class="flex cursor-pointer gap-3 border-rule border-ink p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
                :class="delivery === key ? 'bg-ink text-tissue' : 'bg-tissue hover:bg-white'"
              >
                <input
                  v-model="delivery"
                  type="radio"
                  name="delivery"
                  :value="key"
                  class="sr-only"
                />
                <UiIcon :name="key === 'courier' ? 'truck' : 'returnBox'" />
                <span class="flex-1">
                  <span class="block font-display text-lg uppercase">{{ option.label }}</span>
                  <span class="block text-sm">{{ option.eta }}</span>
                </span>
                <b class="font-mono">{{
                  option.price ? formatPrice(option.price) : 'бесплатно'
                }}</b>
              </label>
            </div>

            <label class="mt-5 block">
              <span class="mb-1.5 block text-sm font-medium">
                {{ delivery === 'courier' ? 'Адрес доставки' : 'Адрес пункта выдачи' }}
              </span>
              <input
                id="field-address"
                v-model="customer.address"
                type="text"
                :autocomplete="delivery === 'courier' ? 'street-address' : 'off'"
                :placeholder="
                  delivery === 'courier' ? 'Улица, дом, квартира' : 'Улица и дом удобного пункта'
                "
                :aria-invalid="Boolean(errors.address)"
                :aria-describedby="errors.address ? 'error-address' : undefined"
                class="field"
                :class="errors.address ? 'outline outline-2 outline-offset-0 outline-brick' : ''"
              />
              <span
                v-if="errors.address"
                id="error-address"
                class="mt-1.5 block text-sm font-semibold"
                >{{ errors.address }}</span
              >
            </label>

            <label class="mt-5 block">
              <span class="mb-1.5 block text-sm font-medium"
                >Комментарий курьеру <span class="font-normal">— необязательно</span></span
              >
              <textarea
                v-model="customer.comment"
                rows="3"
                class="field resize-y"
                placeholder="Код домофона, удобное время"
              />
            </label>
          </fieldset>

          <fieldset>
            <legend class="label-caps text-3xl">Оплата</legend>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <label
                v-for="(label, key) in PAYMENT_OPTIONS"
                :key="key"
                class="cursor-pointer border-rule border-ink p-4 font-display text-lg uppercase transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
                :class="payment === key ? 'bg-ink text-tissue' : 'bg-tissue hover:bg-white'"
              >
                <input v-model="payment" type="radio" name="payment" :value="key" class="sr-only" />
                {{ label }}
              </label>
            </div>
            <p class="mt-3 text-sm">Оплата не списывается — это учебный магазин.</p>
          </fieldset>
        </div>

        <aside class="lg:sticky lg:top-28 lg:self-start" aria-label="Ваш заказ">
          <div class="relative">
            <div
              class="absolute inset-0 translate-x-2 translate-y-2 border-rule border-ink bg-board-deep"
              aria-hidden="true"
            />
            <div class="relative border-rule border-ink bg-tissue p-6">
              <h2 class="label-caps text-3xl">Ваш заказ</h2>
              <ul class="mt-4 divide-y divide-ink/30 border-y-rule border-ink">
                <li v-for="line in cart.lines" :key="line.key" class="flex gap-3 py-3">
                  <img
                    :src="line.imageUrl"
                    alt=""
                    class="size-14 shrink-0 border-rule border-ink object-cover"
                  />
                  <div class="min-w-0 flex-1 text-sm">
                    <p class="truncate font-medium">{{ sneakerName(line) }}</p>
                    <p class="font-mono text-xs">
                      EU {{ formatSize(line.size) }} × {{ line.quantity }}
                    </p>
                  </div>
                  <b class="font-mono text-sm">{{ formatPrice(line.price * line.quantity) }}</b>
                </li>
              </ul>

              <dl class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between gap-3">
                  <dt>Товары</dt>
                  <dd class="font-mono">{{ formatPrice(cart.subtotal) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt>Доставка</dt>
                  <dd class="font-mono">
                    {{ deliveryPrice ? formatPrice(deliveryPrice) : 'бесплатно' }}
                  </dd>
                </div>
                <div
                  class="flex items-baseline justify-between gap-3 border-t-rule border-ink pt-3"
                >
                  <dt class="font-display text-xl uppercase">Итого</dt>
                  <dd class="font-mono text-2xl font-bold">{{ formatPrice(total) }}</dd>
                </div>
              </dl>

              <p v-if="orders.error" class="mt-4 font-semibold" role="alert">
                {{ orders.error }}. Попробуйте ещё раз.
              </p>
              <p
                v-else-if="wasSubmitted && Object.keys(errors).length"
                class="mt-4 font-semibold"
                role="alert"
              >
                Заполните отмеченные поля.
              </p>

              <button
                type="submit"
                class="btn-solid mt-6 w-full py-4 text-base"
                :disabled="orders.isSubmitting"
              >
                {{
                  orders.isSubmitting ? 'Собираем коробки…' : `Оформить на ${formatPrice(total)}`
                }}
              </button>
            </div>
          </div>
        </aside>
      </form>
    </template>
  </div>
</template>
