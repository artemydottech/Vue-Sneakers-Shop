import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Sneaker } from '@/types'
import { useCartStore } from './cart'

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
    expect(cart.total).toBe(0)
  })

  it('adds a second copy as quantity, not as another line', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1000))
    cart.add(sneaker(1, 1000))

    expect(cart.lines).toHaveLength(1)
    expect(cart.count).toBe(2)
  })

  it('counts VAT on top of the subtotal', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1000))
    cart.add(sneaker(2, 2500))

    expect(cart.subtotal).toBe(3500)
    expect(cart.vat).toBe(175)
    expect(cart.total).toBe(3675)
  })

  it('rounds VAT to whole roubles', () => {
    const cart = useCartStore()

    cart.add(sneaker(1, 1233))

    expect(cart.vat).toBe(62)
    expect(cart.total).toBe(1295)
  })

  it('drops the line when the quantity falls below one', () => {
    const cart = useCartStore()
    cart.add(sneaker(1, 1000))

    cart.setQuantity(1, 0)

    expect(cart.isEmpty).toBe(true)
  })

  it('toggles an item in and out', () => {
    const cart = useCartStore()
    const item = sneaker(1, 1000)

    cart.toggle(item)
    expect(cart.has(1)).toBe(true)

    cart.toggle(item)
    expect(cart.has(1)).toBe(false)
  })

  it('ignores stored state that is not a list of lines', () => {
    localStorage.setItem('sneakers:cart', JSON.stringify({ id: 1 }))

    const cart = useCartStore()

    expect(cart.lines).toEqual([])
    expect(cart.total).toBe(0)
  })

  it('restores lines written by a previous session', () => {
    localStorage.setItem(
      'sneakers:cart',
      JSON.stringify([{ id: 4, title: 'Nike', price: 500, imageUrl: '/4.jpg', quantity: 3 }])
    )

    const cart = useCartStore()

    expect(cart.count).toBe(3)
    expect(cart.subtotal).toBe(1500)
  })
})
