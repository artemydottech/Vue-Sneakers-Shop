import type { Sneaker } from '@/types'
import { api, isRemote, mockDelay } from '../client'
import { handleApiError } from '../api-error'
import { SNEAKERS } from './sneakers.mock'

export const getSneakers = async (): Promise<Sneaker[]> => {
  if (!isRemote) {
    await mockDelay()
    return SNEAKERS
  }

  try {
    const { data } = await api.get<Sneaker[]>('/sneakers')
    return data
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить каталог')
  }
}
