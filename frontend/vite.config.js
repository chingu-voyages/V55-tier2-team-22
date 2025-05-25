/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
