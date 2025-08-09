// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

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
  },

  experimental: {
    fonts: [
      {
        provider: 'local',
        name: 'Pretendard',
        cssVariable: '--font-pretendard',
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: [
              './src/assets/fonts/Pretendard/Pretendard-Regular.subset.woff2',
            ],
          },
          {
            weight: 500,
            style: 'normal',
            src: [
              './src/assets/fonts/Pretendard/Pretendard-Medium.subset.woff2',
            ],
          },
          {
            weight: 600,
            style: 'normal',
            src: [
              './src/assets/fonts/Pretendard/Pretendard-SemiBold.subset.woff2',
            ],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/Pretendard/Pretendard-Bold.subset.woff2'],
          },
          {
            weight: 800,
            style: 'normal',
            src: [
              './src/assets/fonts/Pretendard/Pretendard-ExtraBold.subset.woff2',
            ],
          },
        ],
      },
      {
        provider: fontProviders.google(),
        name: 'Roboto Mono',
        cssVariable: '--font-roboto-mono',
      },
      {
        provider: fontProviders.google(),
        name: 'Titillium Web',
        cssVariable: '--font-titillium-web',
      },
    ],
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: 'compile',
  }),
});
