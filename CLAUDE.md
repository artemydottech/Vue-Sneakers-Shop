# «Пара» — учебный магазин кроссовок

Портфолио-проект: полноценная витрина на моковых данных. Vue 3 + TS strict, Pinia, vue-router (hash), Tailwind + SCSS, Vite. Деплой — GitHub Pages из подпапки `/Vue-Sneakers-Shop/`.

## Где что

- Продукт, аудитория, ограничения — `PRODUCT.md`.
- Дизайн-система («стена обувных коробок»: крафт-картон, чёрные линии 1.5px, бирки с вырезом и полосой расцветки) — `DESIGN.md`, токены в `tailwind.config.js`.
- Контракт направления главной — `.impeccable/surfaces/src-pages-home-vue.md`.
- Скилл impeccable установлен в `.claude/skills/impeccable` (+ агенты в `.claude/agents/`). Перед UI-правками — `/impeccable`, после — `.claude/skills/impeccable/scripts/impeccable detect --json <файлы>`.
- Моки: позиции в `src/services/api/sneakers/sneakers.seeds.ts`, генерация размеров/остатков/отзывов детерминированная в `sneakers.mock.ts` и `reviews/reviews.mock.ts`.
- Фото: `public/sneakers/` (исходные 12) и `public/sneakers/u/` (Unsplash, авторы в `CREDITS.md` там же). Чужие фото магазинов не использовать — только Unsplash/Pexels.

## Правила проекта

- Фильтры каталога применяются только по кнопке «Применить», состояние живёт в URL (`src/utils/catalogue-filters.ts`).
- Строка корзины = модель + размер (`lineKey`). Цены включают НДС, к итогу добавляется только доставка.
- Имя модели выводить через `sneakerName()` из `src/utils/sneaker.ts` (убирает дубль бренда).
- `main` пушить только с явного разрешения — пуш сразу публикует сайт на GitHub Pages.

## Проверки

`npm run typecheck`, `npm test`, `npx eslint .`, `npm run build`. Форматирование — `npm run format`.

## Статус (сентябрь 2026)

Ветка `feat/storefront`, ничего не закоммичено. Сделано: главная, каталог с фильтрами, карточка товара (галерея, размеры EU/US/UK/СМ, отзывы), корзина с размерами, оформление заказа, 72 модели. Прошло финальное ревью impeccable (2 раунда правок).

Открыто:
- Advisory детектора: подписи 10–11px вне шкалы DESIGN.md.
- Старые PNG/SVG-иконки в `public/` больше не используются — не удалены.
- Перед коммитом решить: `.impeccable/review/` (скриншоты, ~6 МБ) не коммитить; `.claude/`, `PRODUCT.md`, `DESIGN.md` — коммитить.
