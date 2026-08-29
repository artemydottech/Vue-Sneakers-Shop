const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
})

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit'
})

export const formatPrice = (value: number) => priceFormatter.format(value)

export const formatDate = (value: string) => dateFormatter.format(new Date(value))
