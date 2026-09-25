import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { NewOrder, Order } from '@/types'
import { createOrder } from '@/services/api/orders'
import { errorMessage } from '@/utils/error'
import { isOrderList } from '@/utils/storage-guards'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'para:orders'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>(readJson<Order[]>(STORAGE_KEY, [], isOrderList))
  const isSubmitting = ref(false)
  const error = ref<Nullable<string>>(null)

  const count = computed(() => orders.value.length)

  const byId = (orderId: string) => orders.value.find((order) => order.id === orderId) ?? null

  const place = async (newOrder: NewOrder) => {
    isSubmitting.value = true
    error.value = null

    try {
      const order = await createOrder(newOrder)
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

  return { orders, isSubmitting, error, count, byId, place }
})
