export const SIZE_SYSTEMS = {
  eu: 'EU',
  us: 'US',
  uk: 'UK',
  cm: 'СМ'
} as const

export type SizeSystem = keyof typeof SIZE_SYSTEMS

interface SizeRow {
  eu: number
  us: number
  uk: number
  cm: number
}

export const SIZE_TABLE: SizeRow[] = [
  { eu: 36, us: 4, uk: 3.5, cm: 22.5 },
  { eu: 36.5, us: 4.5, uk: 4, cm: 23 },
  { eu: 37.5, us: 5, uk: 4.5, cm: 23.5 },
  { eu: 38, us: 5.5, uk: 5, cm: 24 },
  { eu: 38.5, us: 6, uk: 5.5, cm: 24 },
  { eu: 39, us: 6.5, uk: 6, cm: 24.5 },
  { eu: 40, us: 7, uk: 6, cm: 25 },
  { eu: 40.5, us: 7.5, uk: 6.5, cm: 25.5 },
  { eu: 41, us: 8, uk: 7, cm: 26 },
  { eu: 42, us: 8.5, uk: 7.5, cm: 26.5 },
  { eu: 42.5, us: 9, uk: 8, cm: 27 },
  { eu: 43, us: 9.5, uk: 8.5, cm: 27.5 },
  { eu: 44, us: 10, uk: 9, cm: 28 },
  { eu: 44.5, us: 10.5, uk: 9.5, cm: 28.5 },
  { eu: 45, us: 11, uk: 10, cm: 29 },
  { eu: 46, us: 12, uk: 11, cm: 30 }
]

const sizeFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })

export const convertSize = (eu: number, system: SizeSystem): number =>
  SIZE_TABLE.find((row) => row.eu === eu)?.[system] ?? eu

export const formatSize = (eu: number, system: SizeSystem = 'eu') =>
  sizeFormatter.format(convertSize(eu, system))
