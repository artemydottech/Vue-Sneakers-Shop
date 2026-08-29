import type { CartLine, Order } from '@/types'
import { api, isRemote, mockDelay } from '../client'
import { handleApiError } from '../api-error'

export const createOrder = async (items: CartLine[], total: number): Promise<Order> => {
  if (!isRemote) {
    await mockDelay(600)
    return { id: crypto.randomUUID(), createdAt: new Date().toISOString(), items, total }
  }

  try {
    const { data } = await api.post<Order>('/orders', { items, total })
    return data
  } catch (error) {
    throw handleApiError(error, 'Не удалось оформить заказ')
  }
}
