import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Проект живёт на GitHub Pages в подпапке — без base ассеты уезжают в корень домена.
export default defineConfig({
  base: '/Vue-Sneakers-Shop/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
