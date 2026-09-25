import { describe, expect, it } from 'vitest'
import type { Customer } from '@/types'
import { formatPhone, phoneDigits, validateCustomer } from './checkout'

const customer = (overrides: Partial<Customer> = {}): Customer => ({
  name: 'Анна',
  phone: '+7 (912) 345-67-89',
  email: 'anna@example.ru',
  city: 'Екатеринбург',
  address: 'ул. Ленина, 1',
  comment: '',
  ...overrides
})

describe('phone', () => {
  it('formats digits as they are typed', () => {
    expect(formatPhone('9')).toBe('+7 (9')
    expect(formatPhone('912345')).toBe('+7 (912) 345')
    expect(formatPhone('89123456789')).toBe('+7 (912) 345-67-89')
  })

  it('drops the country code and extra digits', () => {
    expect(phoneDigits('+7 912 345 67 89 00')).toBe('9123456789')
  })
})

describe('validateCustomer', () => {
  it('accepts a complete form', () => {
    expect(validateCustomer(customer(), 'courier')).toEqual({})
  })

  it('names every missing field', () => {
    const errors = validateCustomer(
      customer({ name: '', phone: '+7 912', email: 'anna@', city: ' ', address: '' }),
      'courier'
    )

    expect(Object.keys(errors).sort()).toEqual(['address', 'city', 'email', 'name', 'phone'])
  })

  it('asks for a pickup point instead of a home address', () => {
    expect(validateCustomer(customer({ address: '' }), 'pickup').address).toMatch(/пункта выдачи/)
  })
})
