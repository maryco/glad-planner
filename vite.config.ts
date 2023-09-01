/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // https://github.com/vitest-dev/vitest/issues/1982
    // Error: Module did not self-register when using Canvas + jsdom
    threads: false,
    setupFiles: ['/src/__tests__/vitest.setup.ts'],
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react(), svgr()],
})
