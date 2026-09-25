import type { LocationQuery, LocationQueryRaw } from 'vue-router'
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  SORT_OPTIONS,
  type Category,
  type CatalogueFilters,
  type Gender,
  type Sneaker,
  type SortKey
} from '@/types'

export const DEFAULT_FILTERS: CatalogueFilters = {
  search: '',
  brands: [],
  categories: [],
  genders: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  onlySale: false,
  sortBy: 'popular'
}

const comparators: Record<SortKey, (a: Sneaker, b: Sneaker) => number> = {
  popular: (a, b) => b.popularity - a.popularity,
  new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.releaseYear - a.releaseYear,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
}

export const isOnSale = (sneaker: Sneaker) =>
  sneaker.oldPrice !== undefined && sneaker.oldPrice > sneaker.price

export const salePercent = (sneaker: Sneaker) =>
  sneaker.oldPrice ? Math.round((1 - sneaker.price / sneaker.oldPrice) * 100) : 0

export const inStockSizes = (sneaker: Sneaker) =>
  sneaker.sizes.filter((size) => size.stock > 0).map((size) => size.eu)

export const applyFilters = (items: Sneaker[], filters: CatalogueFilters): Sneaker[] => {
  const query = filters.search.trim().toLowerCase()

  const filtered = items.filter((item) => {
    if (query && !`${item.brand} ${item.title} ${item.colorway}`.toLowerCase().includes(query)) {
      return false
    }
    if (filters.brands.length && !filters.brands.includes(item.brand)) return false
    if (filters.categories.length && !filters.categories.includes(item.category)) return false
    if (filters.genders.length && !filters.genders.includes(item.gender)) return false
    if (filters.priceMin !== null && item.price < filters.priceMin) return false
    if (filters.priceMax !== null && item.price > filters.priceMax) return false
    if (filters.onlySale && !isOnSale(item)) return false
    if (filters.sizes.length) {
      const available = inStockSizes(item)
      if (!filters.sizes.some((size) => available.includes(size))) return false
    }
    return true
  })

  return filtered.sort(comparators[filters.sortBy])
}

export const countActiveFilters = (filters: CatalogueFilters) =>
  filters.brands.length +
  filters.categories.length +
  filters.genders.length +
  filters.sizes.length +
  Number(filters.priceMin !== null) +
  Number(filters.priceMax !== null) +
  Number(filters.onlySale)

const asList = (value: LocationQuery[string]): string[] => {
  const raw = Array.isArray(value) ? value.join(',') : (value ?? '')
  return raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

const asNumber = (value: LocationQuery[string]): Nullable<number> => {
  const [first] = asList(value)
  if (first === undefined) return null
  const parsed = Number(first)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

const isKeyOf =
  <T extends object>(labels: T) =>
  (value: string): value is Extract<keyof T, string> =>
    Object.hasOwn(labels, value)

const isCategory = isKeyOf(CATEGORY_LABELS)
const isGender = isKeyOf(GENDER_LABELS)
const isSortKey = isKeyOf(SORT_OPTIONS)

export const filtersFromQuery = (query: LocationQuery): CatalogueFilters => {
  const [sort] = asList(query.sort)

  return {
    search: asList(query.q).join(' '),
    brands: asList(query.brand),
    categories: asList(query.category).filter(isCategory) as Category[],
    genders: asList(query.gender).filter(isGender) as Gender[],
    sizes: asList(query.size)
      .map(Number)
      .filter((size) => Number.isFinite(size)),
    priceMin: asNumber(query.from),
    priceMax: asNumber(query.to),
    onlySale: query.sale === '1',
    sortBy: sort !== undefined && isSortKey(sort) ? sort : DEFAULT_FILTERS.sortBy
  }
}

export const filtersToQuery = (filters: CatalogueFilters): LocationQueryRaw => {
  const query: LocationQueryRaw = {}

  if (filters.search.trim()) query.q = filters.search.trim()
  if (filters.brands.length) query.brand = filters.brands.join(',')
  if (filters.categories.length) query.category = filters.categories.join(',')
  if (filters.genders.length) query.gender = filters.genders.join(',')
  if (filters.sizes.length) query.size = filters.sizes.join(',')
  if (filters.priceMin !== null) query.from = String(filters.priceMin)
  if (filters.priceMax !== null) query.to = String(filters.priceMax)
  if (filters.onlySale) query.sale = '1'
  if (filters.sortBy !== DEFAULT_FILTERS.sortBy) query.sort = filters.sortBy

  return query
}
