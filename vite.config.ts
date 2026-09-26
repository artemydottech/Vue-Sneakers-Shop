/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Сборка живёт на GitHub Pages в подпапке — без base ассеты уезжают в корень домена.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Vue-Sneakers-Shop/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom'
  }
}))
