// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // for React testing; use 'node' for backend
    setupFiles: './vitest.setup.ts',
     include: [
      './src/**/*.test.{ts,tsx}',
      './src/**/__tests__/**/*.{ts,tsx}',
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './src/config'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      graphql: path.resolve(__dirname, './src/graphql'),
      data: path.resolve(__dirname, './src/data'),
      // add more if needed
    },
  },
})
