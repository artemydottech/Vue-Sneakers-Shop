import type { Review } from '@/types'
import { api, isRemote, mockDelay } from '../client'
import { handleApiError } from '../api-error'
import { REVIEWS_BY_SNEAKER } from '../sneakers/sneakers.mock'

export const getReviews = async (sneakerId: number): Promise<Review[]> => {
  if (!isRemote) {
    await mockDelay(350)
    return REVIEWS_BY_SNEAKER.get(sneakerId) ?? []
  }

  try {
    const { data } = await api.get<Review[]>(`/sneakers/${sneakerId}/reviews`)
    return data
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить отзывы')
  }
}
