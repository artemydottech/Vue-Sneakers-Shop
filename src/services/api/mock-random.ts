/** Детерминированный генератор: одинаковый seed даёт одинаковые моки при каждой загрузке. */
export const createRandom = (seed: number) => {
  let state = seed >>> 0

  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }

  const int = (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min

  const pick = <T>(list: readonly T[]): T => list[Math.floor(next() * list.length)] as T

  const shuffle = <T>(list: readonly T[]): T[] => {
    const copy = [...list]
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(next() * (index + 1))
      ;[copy[index], copy[swap]] = [copy[swap] as T, copy[index] as T]
    }
    return copy
  }

  return { next, int, pick, shuffle }
}
