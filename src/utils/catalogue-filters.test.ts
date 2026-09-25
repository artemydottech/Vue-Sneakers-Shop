import { describe, expect, it } from 'vitest'
import type { Sneaker } from '@/types'
import {
  DEFAULT_FILTERS,
  applyFilters,
  countActiveFilters,
  filtersFromQuery,
  filtersToQuery
} from './catalogue-filters'

const sneaker = (overrides: Partial<Sneaker>): Sneaker =>
  ({
    id: 1,
    title: 'Air Max 90',
    brand: 'Nike',
    price: 10000,
    colorway: 'белый',
    category: 'lifestyle',
    gender: 'unisex',
    sizes: [{ eu: 42, stock: 3 }],
    popularity: 1,
    rating: 4.5,
    reviewCount: 10,
    releaseYear: 2020,
    isNew: false,
    ...overrides
  }) as Sneaker

describe('applyFilters', () => {
  const items = [
    sneaker({ id: 1, brand: 'Nike', price: 9000, popularity: 3 }),
    sneaker({ id: 2, brand: 'adidas', title: 'Samba', price: 12000, popularity: 5 }),
    sneaker({
      id: 3,
      brand: 'New Balance',
      title: '550',
      price: 15000,
      oldPrice: 18000,
      category: 'basketball',
      sizes: [
        { eu: 42, stock: 0 },
        { eu: 43, stock: 2 }
      ],
      popularity: 1
    })
  ]

  it('sorts by popularity by default', () => {
    expect(applyFilters(items, DEFAULT_FILTERS).map((item) => item.id)).toEqual([2, 1, 3])
  })

  it('searches across brand and title', () => {
    const result = applyFilters(items, { ...DEFAULT_FILTERS, search: 'samba' })
    expect(result.map((item) => item.id)).toEqual([2])
  })

  it('keeps only the chosen brands and price range', () => {
    const result = applyFilters(items, {
      ...DEFAULT_FILTERS,
      brands: ['Nike', 'New Balance'],
      priceMax: 10000
    })
    expect(result.map((item) => item.id)).toEqual([1])
  })

  it('matches a size only when it is in stock', () => {
    const result = applyFilters(items, { ...DEFAULT_FILTERS, sizes: [43] })
    expect(result.map((item) => item.id)).toEqual([3])

    const soldOut = applyFilters([items[2] as Sneaker], { ...DEFAULT_FILTERS, sizes: [42] })
    expect(soldOut).toEqual([])
  })

  it('shows only discounted pairs when asked', () => {
    const result = applyFilters(items, { ...DEFAULT_FILTERS, onlySale: true })
    expect(result.map((item) => item.id)).toEqual([3])
  })
})

describe('query round trip', () => {
  it('restores the same filters it wrote', () => {
    const filters = {
      ...DEFAULT_FILTERS,
      search: 'air',
      brands: ['Nike', 'adidas'],
      categories: ['running' as const],
      sizes: [42, 42.5],
      priceMin: 5000,
      onlySale: true,
      sortBy: 'priceAsc' as const
    }

    expect(filtersFromQuery(filtersToQuery(filters) as never)).toEqual(filters)
  })

  it('drops unknown categories, sort keys and broken numbers', () => {
    const filters = filtersFromQuery({
      category: 'running,flying',
      sort: 'random',
      from: 'abc',
      to: '-5'
    })

    expect(filters.categories).toEqual(['running'])
    expect(filters.sortBy).toBe('popular')
    expect(filters.priceMin).toBeNull()
    expect(filters.priceMax).toBeNull()
  })

  it('writes nothing for default filters', () => {
    expect(filtersToQuery(DEFAULT_FILTERS)).toEqual({})
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0)
  })
})
