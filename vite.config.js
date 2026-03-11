import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  root: path.resolve(__dirname, 'frontend'),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: true,
  },
})
