import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? ''

// Пустой VITE_API_URL — работаем на локальных моках. Задан — уходим в сеть.
export const isRemote = baseURL.length > 0

export const api = axios.create({ baseURL })

export const mockDelay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms))
