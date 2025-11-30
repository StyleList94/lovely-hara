// @ts-check
import process from 'node:process';

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const isTest = !!process.env.VITEST;

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
  adapter: isTest
    ? undefined
    : cloudflare({
        platformProxy: {
          enabled: true,
        },
        imageService: 'cloudflare',
      }),
});
