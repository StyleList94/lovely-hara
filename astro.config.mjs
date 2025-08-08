// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
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
    ssr: {
      external: ['node:stream'],
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
              './src/assets/fonts/pretendard/Pretendard-Regular.subset.woff2',
            ],
          },
          {
            weight: 500,
            style: 'normal',
            src: [
              './src/assets/fonts/pretendard/Pretendard-Medium.subset.woff2',
            ],
          },
          {
            weight: 600,
            style: 'normal',
            src: [
              './src/assets/fonts/pretendard/Pretendard-SemiBold.subset.woff2',
            ],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/pretendard/Pretendard-Bold.subset.woff2'],
          },
          {
            weight: 800,
            style: 'normal',
            src: [
              './src/assets/fonts/pretendard/Pretendard-ExtraBold.subset.woff2',
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
    imageService: 'cloudflare',
  }),
});
