export const readJson = <T>(key: string, fallback: T, isValid?: (value: unknown) => boolean): T => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback

    const parsed = JSON.parse(raw) as unknown
    if (isValid && !isValid(parsed)) return fallback

    return parsed as T
  } catch {
    return fallback
  }
}

export const writeJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Приватный режим и переполненное хранилище — состояние живёт до перезагрузки.
  }
}
