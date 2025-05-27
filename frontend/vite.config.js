/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    include: [
      ...configDefaults.include,
      'tests/unit/*.test.js',
      'tests/unit/*.spec.js',
    ],
    exclude: [
      ...configDefaults.exclude,
      'tests/e2e/*'
    ]
  }
})
