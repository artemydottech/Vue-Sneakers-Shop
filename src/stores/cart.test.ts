import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Sneaker } from '@/types'
import { lineKey, useCartStore } from './cart'

const sneaker = (id: number, price: number): Sneaker =>
  ({ id, title: `Кроссовки ${id}`, brand: 'Nike', price, imageUrl: `/${id}.jpg` }) as Sneaker

describe('cart store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts empty', () => {
    const cart = useCartStore()

    expect(cart.isEmpty).toBe(true)
    expect(cart.count).toBe(0)
    expect(cart.subtotal).toBe(0)
  })

  it('adds the same size again as quantity, not as another line', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1000), 42)
    cart.add(sneaker(1, 1000), 42)

    expect(cart.lines).toHaveLength(1)
    expect(cart.count).toBe(2)
  })

  it('keeps two sizes of one model as separate lines', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1000), 42)
    cart.add(sneaker(1, 1000), 43)

    expect(cart.lines).toHaveLength(2)
    expect(cart.has(1, 42)).toBe(true)
    expect(cart.has(1, 44)).toBe(false)
    expect(cart.has(1)).toBe(true)
  })

  it('sums prices across lines and quantities', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1000), 42)
    cart.add(sneaker(1, 1000), 42)
    cart.add(sneaker(2, 2500), 40)

    expect(cart.subtotal).toBe(4500)
  })

  it('drops the line when the quantity falls below one', () => {
    const cart = useCartStore()
    cart.add(sneaker(1, 1000), 42)

    cart.setQuantity(lineKey(1, 42), 0)

    expect(cart.isEmpty).toBe(true)
  })

  it('removes only the addressed size', () => {
    const cart = useCartStore()
    cart.add(sneaker(1, 1000), 42)
    cart.add(sneaker(1, 1000), 43)

    cart.remove(lineKey(1, 42))

    expect(cart.lines.map((line) => line.size)).toEqual([43])
  })

  it('ignores stored state that is not a list of lines', () => {
    localStorage.setItem('para:cart', JSON.stringify({ id: 1 }))

    const cart = useCartStore()

    expect(cart.lines).toEqual([])
  })

  it('ignores lines stored without a size', () => {
    localStorage.setItem(
      'para:cart',
      JSON.stringify([{ id: 4, title: 'Nike', price: 500, imageUrl: '/4.jpg', quantity: 3 }])
    )

    const cart = useCartStore()

    expect(cart.isEmpty).toBe(true)
  })

  it('restores lines written by a previous session', () => {
    localStorage.setItem(
      'para:cart',
      JSON.stringify([
        {
          key: lineKey(4, 41),
          id: 4,
          title: 'Air Max',
          brand: 'Nike',
          price: 500,
          imageUrl: '/4.jpg',
          size: 41,
          quantity: 3
        }
      ])
    )

    const cart = useCartStore()

    expect(cart.count).toBe(3)
    expect(cart.subtotal).toBe(1500)
  })
})
