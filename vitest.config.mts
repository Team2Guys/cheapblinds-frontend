// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // for React testing; use 'node' for backend
    setupFiles: './vitest.setup.ts',
  },
})
