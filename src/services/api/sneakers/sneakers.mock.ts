import type { Category, Gender, Review, SizeStock, Sneaker, SneakerMaterials } from '@/types'
import { asset } from '@/utils/asset'
import { SIZE_TABLE } from '@/utils/sizes'
import { createRandom } from '../mock-random'
import { buildReviews } from '../reviews/reviews.mock'
import { SNEAKER_SEEDS } from './sneakers.seeds'

export interface SneakerSeed {
  brand: string
  title: string
  category: Category
  gender: Gender
  price: number
  oldPrice?: number
  colorway: string
  colors: string[]
  images: string[]
  description: string
  releaseYear: number
  isNew?: boolean
  materials?: Partial<SneakerMaterials>
}

const MATERIALS: Record<Category, SneakerMaterials> = {
  lifestyle: {
    upper: 'Натуральная кожа и замша',
    lining: 'Текстиль',
    sole: 'Резина, вспененная промежуточная подошва'
  },
  running: {
    upper: 'Дышащая сетка',
    lining: 'Текстиль',
    sole: 'Пена EVA, резиновые вставки в зонах износа'
  },
  basketball: {
    upper: 'Синтетика и текстиль',
    lining: 'Текстиль',
    sole: 'Резина с глубоким протектором, амортизирующая вставка'
  },
  skate: { upper: 'Замша и канвас', lining: 'Текстиль', sole: 'Вулканизированная резина' },
  court: { upper: 'Гладкая кожа', lining: 'Текстиль', sole: 'Резиновая чашка' }
}

const SIZE_SPAN: Record<Gender, [number, number]> = {
  women: [36, 41],
  men: [39, 46],
  unisex: [36.5, 45]
}

const STYLE_PREFIX: Record<string, string> = {
  Nike: 'DV',
  Jordan: 'FQ',
  adidas: 'IE',
  'New Balance': 'BB',
  Asics: '1203A',
  Converse: 'A0',
  Vans: 'VN0A',
  Puma: '39',
  Reebok: 'GY',
  'Under Armour': '30',
  Saucony: 'S2',
  On: '59',
  Skechers: '22',
  Lacoste: '47',
  'Tommy Hilfiger': 'FM0',
  'Пара Studio': 'PR'
}

const buildSizes = (sneakerId: number, gender: Gender): SizeStock[] => {
  const random = createRandom(sneakerId * 104729)
  const [from, to] = SIZE_SPAN[gender]

  return SIZE_TABLE.filter((row) => row.eu >= from && row.eu <= to).map((row) => {
    const roll = random.next()
    return {
      eu: row.eu,
      stock: roll < 0.18 ? 0 : roll < 0.35 ? random.int(1, 2) : random.int(3, 9)
    }
  })
}

const buildStyleCode = (sneakerId: number, brand: string) => {
  const random = createRandom(sneakerId * 15485863)
  const prefix = STYLE_PREFIX[brand] ?? 'SN'
  return `${prefix}${random.int(1000, 9999)}-${String(random.int(1, 999)).padStart(3, '0')}`
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const REVIEWS_BY_SNEAKER = new Map<number, Review[]>()

export const SNEAKERS: Sneaker[] = SNEAKER_SEEDS.map((seed, index) => {
  const id = index + 1
  const random = createRandom(id * 2654435761)
  const sizes = buildSizes(id, seed.gender)
  const reviews = buildReviews(
    id,
    random.int(seed.isNew ? 1 : 4, 16),
    sizes.map((size) => size.eu)
  )
  const rating = reviews.length
    ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) /
      10
    : 0

  REVIEWS_BY_SNEAKER.set(id, reviews)

  const images = seed.images.map((path) => asset(path))

  return {
    id,
    slug: slugify(`${seed.brand} ${seed.title}`),
    title: seed.title,
    brand: seed.brand,
    price: seed.price,
    oldPrice: seed.oldPrice,
    imageUrl: images[0] ?? '',
    images,
    description: seed.description,
    category: seed.category,
    gender: seed.gender,
    colorway: seed.colorway,
    colors: seed.colors,
    styleCode: buildStyleCode(id, seed.brand),
    sizes,
    materials: { ...MATERIALS[seed.category], ...seed.materials },
    releaseYear: seed.releaseYear,
    rating,
    reviewCount: reviews.length,
    popularity: Math.round(random.next() * 1000) + reviews.length * 25,
    isNew: seed.isNew ?? false
  }
})
