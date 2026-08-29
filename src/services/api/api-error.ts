import axios from 'axios'

export class ApiError extends Error {
  readonly status: Nullable<number>

  constructor(message: string, status: Nullable<number>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const handleApiError = (error: unknown, message: string) => {
  const status = axios.isAxiosError(error) ? (error.response?.status ?? null) : null

  return new ApiError(message, status)
}
