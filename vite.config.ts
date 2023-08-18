/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/__tests__/vitest.setup.ts'],
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react(), svgr()],
})
