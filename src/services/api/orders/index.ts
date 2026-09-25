import type { NewOrder, Order } from '@/types'
import { api, isRemote, mockDelay } from '../client'
import { handleApiError } from '../api-error'

export const createOrder = async (order: NewOrder): Promise<Order> => {
  if (!isRemote) {
    await mockDelay(700)
    return { ...order, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  }

  try {
    const { data } = await api.post<Order>('/orders', order)
    return data
  } catch (error) {
    throw handleApiError(error, 'Не удалось оформить заказ')
  }
}
