import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CartLine, Sneaker } from '@/types'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'sneakers:cart'
const VAT_RATE = 0.05

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>(readJson<CartLine[]>(STORAGE_KEY, []))

  const ids = computed(() => new Set(lines.value.map((line) => line.id)))
  const count = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))
  const subtotal = computed(() =>
    lines.value.reduce((sum, line) => sum + line.price * line.quantity, 0)
  )
  const vat = computed(() => Math.round(subtotal.value * VAT_RATE))
  const total = computed(() => subtotal.value + vat.value)
  const isEmpty = computed(() => lines.value.length === 0)

  const has = (id: number) => ids.value.has(id)

  const add = (sneaker: Sneaker) => {
    const line = lines.value.find((item) => item.id === sneaker.id)

    if (line) {
      line.quantity += 1
      return
    }

    lines.value.push({
      id: sneaker.id,
      title: sneaker.title,
      price: sneaker.price,
      imageUrl: sneaker.imageUrl,
      quantity: 1
    })
  }

  const remove = (id: number) => {
    lines.value = lines.value.filter((line) => line.id !== id)
  }

  const setQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      remove(id)
      return
    }

    const line = lines.value.find((item) => item.id === id)
    if (line) line.quantity = quantity
  }

  const toggle = (sneaker: Sneaker) => {
    if (has(sneaker.id)) {
      remove(sneaker.id)
      return
    }

    add(sneaker)
  }

  const clear = () => {
    lines.value = []
  }

  watch(lines, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return {
    lines,
    count,
    subtotal,
    vat,
    total,
    isEmpty,
    has,
    add,
    remove,
    setQuantity,
    toggle,
    clear
  }
})
