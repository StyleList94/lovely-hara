import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      // Cloudflare adapter's vite plugin conflicts with Vitest,
      // so we use plain vitest config instead of astro's getViteConfig.
      // This alias mocks the astro:actions virtual module for tests.
      'astro:actions': new URL(
        './src/__mocks__/astro-actions.ts',
        import.meta.url,
      ).pathname,
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    css: true,
  },
});
