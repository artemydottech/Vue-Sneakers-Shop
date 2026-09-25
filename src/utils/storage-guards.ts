const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const isIdList = (value: unknown): boolean =>
  Array.isArray(value) && value.every((item) => typeof item === 'number')

export const isCartLines = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.key === 'string' &&
      typeof item.id === 'number' &&
      typeof item.size === 'number' &&
      typeof item.quantity === 'number' &&
      typeof item.price === 'number'
  )

export const isOrderList = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.id === 'string' &&
      typeof item.total === 'number' &&
      isRecord(item.customer) &&
      isCartLines(item.items)
  )
