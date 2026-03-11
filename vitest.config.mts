import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
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
