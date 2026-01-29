import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import FavoritesPage from './pages/Favorites.vue'
import ProfilePage from './pages/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/favorites', name: 'favorites', component: FavoritesPage },
  { path: '/profile', name: 'profile', component: ProfilePage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
