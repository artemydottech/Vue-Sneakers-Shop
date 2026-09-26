import { createRouter, createWebHashHistory } from 'vue-router'

const HEADER_OFFSET = 96
const BRAND_TITLE = 'Пара — магазин кроссовок'

const PAGE_TITLES: Record<string, string> = {
  catalog: 'Каталог',
  checkout: 'Оформление заказа',
  favorites: 'Закладки',
  orders: 'Заказы',
  'not-found': 'Страница не найдена'
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/home.vue') },
    { path: '/catalog', name: 'catalog', component: () => import('@/pages/catalog.vue') },
    {
      path: '/product/:sneakerId(\\d+)',
      name: 'product',
      component: () => import('@/pages/product.vue'),
      meta: { transition: 'lid' }
    },
    { path: '/checkout', name: 'checkout', component: () => import('@/pages/checkout.vue') },
    { path: '/favorites', name: 'favorites', component: () => import('@/pages/favorites.vue') },
    { path: '/orders', name: 'orders', component: () => import('@/pages/orders.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: HEADER_OFFSET }
    if (to.path === from.path) return false
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const pageTitle = typeof to.name === 'string' ? PAGE_TITLES[to.name] : undefined
  document.title = pageTitle ? `${pageTitle} — Пара` : BRAND_TITLE
})
