# Sneakers 2.0

Витрина кроссовок на Vue 3, Pinia и Tailwind CSS.

## Стек

- Vue 3 (`<script setup>`, TypeScript strict) + Vite
- Pinia — корзина, закладки, заказы
- vue-router (hash history, чтобы работало на GitHub Pages)
- Tailwind CSS + SCSS для базового слоя

## Данные

Каталог берётся из слоя `src/services/api`. Он выбирает адаптер по `VITE_API_URL`:

| `VITE_API_URL` | Поведение                                              |
| -------------- | ------------------------------------------------------ |
| не задан       | локальные моки из `services/api/sneakers/sneakers.mock` |
| задан          | axios-запросы к этому origin                            |

Корзина, закладки и заказы живут в `localStorage` — бэкенд для них не нужен.

## Скрипты

```bash
npm run dev        # дев-сервер
npm run build      # прод-сборка
npm run preview    # предпросмотр сборки
npm run typecheck  # vue-tsc --noEmit
npm run lint       # eslint --fix
npm run format     # prettier --write src/
npm run deploy     # gh-pages -d dist
```

## Структура

```text
src/
  components/   витрина, карточка, корзина-дровер, пустые состояния
  pages/        home, product, favorites, orders
  stores/       catalogue, cart, favorites, orders
  services/api/ client + sneakers + orders
  utils/        format, storage
  types/        доменные типы и глобальные хелперы
```
