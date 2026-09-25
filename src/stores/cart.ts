import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CartLine, Sneaker } from '@/types'
import { isCartLines } from '@/utils/storage-guards'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'para:cart'

export const lineKey = (sneakerId: number, size: number) => `${sneakerId}:${size}`

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>(readJson<CartLine[]>(STORAGE_KEY, [], isCartLines))

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))
  const subtotal = computed(() =>
    lines.value.reduce((sum, line) => sum + line.price * line.quantity, 0)
  )
  const isEmpty = computed(() => lines.value.length === 0)

  const has = (sneakerId: number, size?: number) =>
    lines.value.some((line) => line.id === sneakerId && (size === undefined || line.size === size))

  const add = (sneaker: Sneaker, size: number) => {
    const key = lineKey(sneaker.id, size)
    const line = lines.value.find((item) => item.key === key)

    if (line) {
      line.quantity += 1
      return
    }

    lines.value.push({
      key,
      id: sneaker.id,
      title: sneaker.title,
      brand: sneaker.brand,
      price: sneaker.price,
      imageUrl: sneaker.imageUrl,
      size,
      quantity: 1
    })
  }

  const remove = (key: string) => {
    lines.value = lines.value.filter((line) => line.key !== key)
  }

  const setQuantity = (key: string, quantity: number) => {
    if (quantity < 1) {
      remove(key)
      return
    }

    const line = lines.value.find((item) => item.key === key)
    if (line) line.quantity = quantity
  }

  const clear = () => {
    lines.value = []
  }

  watch(lines, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return { lines, count, subtotal, isEmpty, has, add, remove, setQuantity, clear }
})
