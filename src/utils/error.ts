/** Ошибка приходит из catch как unknown: строка или объект без message тоже возможны. */
export const errorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback
