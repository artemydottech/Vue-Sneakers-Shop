export interface Sneaker {
  id: number
  title: string
  brand: string
  price: number
  imageUrl: string
  description?: string
}

export interface CartLine {
  id: number
  title: string
  price: number
  imageUrl: string
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  items: CartLine[]
  total: number
}

export const SORT_OPTIONS = {
  popular: 'Сначала популярные',
  priceAsc: 'Сначала дешёвые',
  priceDesc: 'Сначала дорогие',
  title: 'По названию'
} as const

export type SortKey = keyof typeof SORT_OPTIONS

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
