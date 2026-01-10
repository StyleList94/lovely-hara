import { getViteConfig } from 'astro/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default getViteConfig({
  // @ts-expect-error vite version mismatch
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    css: true,
  },
});
