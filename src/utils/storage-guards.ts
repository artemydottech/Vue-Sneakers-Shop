export const isIdList = (value: unknown): boolean =>
  Array.isArray(value) && value.every((item) => typeof item === 'number')

export const isCartLines = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as { id?: unknown }).id === 'number' &&
      typeof (item as { quantity?: unknown }).quantity === 'number' &&
      typeof (item as { price?: unknown }).price === 'number'
  )
