<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CATEGORY_LABELS } from '@/types'
import { asset } from '@/utils/asset'

const linkClass = 'hover:underline decoration-[1.5px]'
</script>

<template>
  <footer class="mt-auto bg-ink text-tissue">
    <div class="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <p class="font-display text-6xl font-bold uppercase leading-none">Пара</p>
        <p class="mt-4 max-w-[40ch] text-sm leading-relaxed text-tissue">
          Учебный магазин кроссовок. Товары, цены, остатки и отзывы — демонстрационные, заказ никуда
          не уходит.
        </p>
      </div>

      <nav aria-label="Категории">
        <h2 class="font-display text-sm uppercase tracking-[0.08em]">Каталог</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="(label, category) in CATEGORY_LABELS" :key="category">
            <RouterLink :to="{ path: '/catalog', query: { category } }" :class="linkClass">
              {{ label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Покупателям">
        <h2 class="font-display text-sm uppercase tracking-[0.08em]">Покупателям</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li><RouterLink to="/orders" :class="linkClass">Мои заказы</RouterLink></li>
          <li><RouterLink to="/favorites" :class="linkClass">Закладки</RouterLink></li>
          <li><RouterLink to="/#sizes" :class="linkClass">Таблица размеров</RouterLink></li>
          <li>
            <a
              :href="asset('sneakers/u/CREDITS.md')"
              :class="linkClass"
              target="_blank"
              rel="noopener"
            >
              Авторы фотографий
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="border-t border-tissue/30">
      <div class="container-page flex flex-wrap justify-between gap-3 py-5 font-mono text-xs">
        <span>Сделал Артемий Зверев</span>
        <span>Vue 3 · Pinia · Tailwind</span>
      </div>
    </div>
  </footer>
</template>
