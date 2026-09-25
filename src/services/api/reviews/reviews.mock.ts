import type { Fit, Review } from '@/types'
import { createRandom } from '../mock-random'

const AUTHORS = [
  'Алина',
  'Максим',
  'Дарья',
  'Илья',
  'Софья',
  'Артём',
  'Полина',
  'Никита',
  'Вероника',
  'Тимур',
  'Ксения',
  'Глеб',
  'Мария',
  'Егор',
  'Ульяна',
  'Руслан',
  'Ева',
  'Даниил',
  'Лиза',
  'Марк'
] as const

const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Екатеринбург',
  'Казань',
  'Новосибирск',
  'Нижний Новгород',
  'Самара',
  'Краснодар',
  'Пермь',
  'Тюмень',
  'Воронеж',
  'Уфа'
] as const

const TEXTS: Record<number, readonly string[]> = {
  5: [
    'Сели идеально с первого дня, разнашивать не пришлось. Хожу по 15 тысяч шагов — ноги не устают.',
    'Цвет вживую даже лучше, чем на фото. Коробка целая, внутри бумага и запасные шнурки.',
    'Беру эту модель уже второй раз. Качество не поменялось, швы ровные, клей нигде не торчит.',
    'Лёгкие и мягкие, в городе самое то. Брал свой обычный размер — сели точно.',
    'Отличная пара на каждый день: подходят и к джинсам, и к широким брюкам.',
    'Доставили за два дня, всё аккуратно. Пятка держит хорошо, нога не выскальзывает.',
    'Долго выбирал между этой и соседней моделью — не пожалел. Подошва мягче, чем ожидал.'
  ],
  4: [
    'В целом доволен. Первую неделю немного давили в носке, потом разносились.',
    'Хорошие, но светлый верх быстро пачкается — придётся купить средство для чистки.',
    'Удобные, но шнурки длинноваты, пришлось завязывать двойным узлом.',
    'Качество хорошее, но на мой широкий подъём сидят плотновато. Советую брать на полразмера больше.',
    'Смотрятся отлично, звёздочку снимаю за скрип стельки в первые дни — потом прошёл.'
  ],
  3: [
    'Нормально, но ожидал большего за эти деньги. Амортизации маловато для долгих прогулок.',
    'Цвет оказался чуть темнее, чем на экране. Сидят нормально, но вау-эффекта нет.',
    'Для зала пойдут, для бега жестковаты. Верх приятный.'
  ],
  2: ['Через месяц на сгибе появились заломы. По посадке претензий нет, но расстроился.']
}

const FIT_WEIGHTS: readonly Fit[] = ['true', 'true', 'true', 'true', 'small', 'large']

export const buildReviews = (sneakerId: number, count: number, sizes: number[]): Review[] => {
  const random = createRandom(sneakerId * 7919)
  const used = new Set<string>()
  const reviews: Review[] = []
  const now = Date.UTC(2026, 8, 20)

  for (let index = 0; index < count; index += 1) {
    const roll = random.next()
    const rating = roll < 0.55 ? 5 : roll < 0.85 ? 4 : roll < 0.96 ? 3 : 2
    const pool = (TEXTS[rating] ?? []).filter((text) => !used.has(text))
    if (!pool.length) continue

    const text = random.pick(pool)
    used.add(text)

    reviews.push({
      id: `${sneakerId}-${index}`,
      sneakerId,
      author: random.pick(AUTHORS),
      city: random.pick(CITIES),
      rating,
      createdAt: new Date(now - random.int(2, 320) * 86_400_000).toISOString(),
      size: sizes.length ? random.pick(sizes) : 42,
      fit: random.pick(FIT_WEIGHTS),
      text
    })
  }

  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
