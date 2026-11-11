import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Mirror the `@/*` path in tsconfig.json.
    alias: { '@': new URL('./', import.meta.url).pathname },
  },
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**'],
  },
});
