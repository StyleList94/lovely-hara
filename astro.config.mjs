// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

import {
  mozillaText,
  pretendard,
  robotoMono,
  titilliumWeb,
} from './src/assets/fonts';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: import.meta.env.PROD
        ? {
            'react-dom/server': 'react-dom/server.edge',
          }
        : {},
    },
    ssr: {
      external: ['node:stream'],
    },
  },
  experimental: {
    fonts: [
      // @ts-ignore
      pretendard,
      robotoMono,
      titilliumWeb,
      // @ts-ignore
      mozillaText,
    ],
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: 'cloudflare',
  }),
});
