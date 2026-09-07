import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CartLine, Order } from '@/types'
import { createOrder } from '@/services/api/orders'
import { errorMessage } from '@/utils/error'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'sneakers:orders'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>(readJson<Order[]>(STORAGE_KEY, [], Array.isArray))
  const isSubmitting = ref(false)
  const error = ref<Nullable<string>>(null)

  const count = computed(() => orders.value.length)

  const place = async (items: CartLine[], total: number) => {
    isSubmitting.value = true
    error.value = null

    try {
      const order = await createOrder(items, total)
      orders.value = [order, ...orders.value]
      return order
    } catch (placeError) {
      error.value = errorMessage(placeError, 'Не удалось оформить заказ')
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  watch(orders, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return { orders, isSubmitting, error, count, place }
})
