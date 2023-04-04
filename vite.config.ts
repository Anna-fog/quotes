import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    coverage: {
      provider: 'c8',
      include: ['src/**/*.ts', 'src/*.vue', 'src/**/*.vue'],
      exclude: ['src/assets/*', 'src/**/*.test.ts', 'src/**/*.json', 'src/components/icons/*'],
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
  },
})
