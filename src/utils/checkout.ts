import type { Customer, DeliveryMethod } from '@/types'

export type CustomerErrors = Partial<Record<keyof Customer, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const phoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  const national = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits
  return national.slice(0, 10)
}

export const formatPhone = (value: string) => {
  const digits = phoneDigits(value)
  if (!digits) return ''

  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)]

  let result = `+7 (${parts[0]}`
  if (digits.length > 3) result += `) ${parts[1]}`
  if (digits.length > 6) result += `-${parts[2]}`
  if (digits.length > 8) result += `-${parts[3]}`
  return result
}

export const validateCustomer = (customer: Customer, delivery: DeliveryMethod): CustomerErrors => {
  const errors: CustomerErrors = {}

  if (customer.name.trim().length < 2)
    errors.name = 'Напишите имя — так курьер поймёт, кому отдать заказ'
  if (phoneDigits(customer.phone).length !== 10) errors.phone = 'Нужен номер из 10 цифр после +7'
  if (!EMAIL_PATTERN.test(customer.email.trim()))
    errors.email = 'Проверьте почту — пришлём на неё чек'
  if (!customer.city.trim()) errors.city = 'Укажите город'
  if (!customer.address.trim()) {
    errors.address =
      delivery === 'courier' ? 'Укажите улицу, дом и квартиру' : 'Укажите адрес пункта выдачи'
  }

  return errors
}
