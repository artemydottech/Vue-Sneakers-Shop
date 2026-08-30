import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/home.vue') },
    { path: '/product/:id', name: 'product', component: () => import('@/pages/product.vue') },
    { path: '/favorites', name: 'favorites', component: () => import('@/pages/favorites.vue') },
    { path: '/orders', name: 'orders', component: () => import('@/pages/orders.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found.vue')
    }
  ]
})
