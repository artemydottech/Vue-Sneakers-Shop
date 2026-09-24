export const CATEGORY_LABELS = {
  lifestyle: 'Лайфстайл',
  running: 'Бег',
  basketball: 'Баскетбол',
  skate: 'Скейт',
  court: 'Корт'
} as const

export type Category = keyof typeof CATEGORY_LABELS

export const GENDER_LABELS = {
  men: 'Мужские',
  women: 'Женские',
  unisex: 'Унисекс'
} as const

export type Gender = keyof typeof GENDER_LABELS

export interface SizeStock {
  eu: number
  stock: number
}

export interface SneakerMaterials {
  upper: string
  lining: string
  sole: string
}

export interface Sneaker {
  id: number
  slug: string
  title: string
  brand: string
  price: number
  oldPrice?: number
  imageUrl: string
  images: string[]
  description: string
  category: Category
  gender: Gender
  colorway: string
  colors: string[]
  styleCode: string
  sizes: SizeStock[]
  materials: SneakerMaterials
  releaseYear: number
  rating: number
  reviewCount: number
  popularity: number
  isNew: boolean
}

export const FIT_LABELS = {
  small: 'Маломерят',
  true: 'В размер',
  large: 'Большемерят'
} as const

export type Fit = keyof typeof FIT_LABELS

export interface Review {
  id: string
  sneakerId: number
  author: string
  city: string
  rating: number
  createdAt: string
  size: number
  fit: Fit
  text: string
}

export interface CartLine {
  key: string
  id: number
  title: string
  brand: string
  price: number
  imageUrl: string
  size: number
  quantity: number
}

export const DELIVERY_OPTIONS = {
  courier: { label: 'Курьером', price: 490, eta: '1–2 дня' },
  pickup: { label: 'В пункт выдачи', price: 0, eta: '2–4 дня' }
} as const

export type DeliveryMethod = keyof typeof DELIVERY_OPTIONS

export const PAYMENT_OPTIONS = {
  card: 'Картой онлайн',
  onDelivery: 'При получении'
} as const

export type PaymentMethod = keyof typeof PAYMENT_OPTIONS

export interface Customer {
  name: string
  phone: string
  email: string
  city: string
  address: string
  comment: string
}

export interface Order {
  id: string
  createdAt: string
  items: CartLine[]
  subtotal: number
  deliveryPrice: number
  total: number
  customer: Customer
  delivery: DeliveryMethod
  payment: PaymentMethod
}

export interface NewOrder {
  items: CartLine[]
  subtotal: number
  deliveryPrice: number
  total: number
  customer: Customer
  delivery: DeliveryMethod
  payment: PaymentMethod
}

export const SORT_OPTIONS = {
  popular: 'Сначала популярные',
  new: 'Сначала новинки',
  priceAsc: 'Сначала дешёвые',
  priceDesc: 'Сначала дорогие',
  rating: 'По рейтингу'
} as const

export type SortKey = keyof typeof SORT_OPTIONS

export interface CatalogueFilters {
  search: string
  brands: string[]
  categories: Category[]
  genders: Gender[]
  sizes: number[]
  priceMin: Nullable<number>
  priceMax: Nullable<number>
  onlySale: boolean
  sortBy: SortKey
}

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
