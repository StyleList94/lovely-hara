// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Pretendard',
      cssVariable: '--astro-font-sans',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Pretendard-Regular.subset.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/Pretendard-Medium.subset.woff2'],
            weight: 500,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/Pretendard-SemiBold.subset.woff2'],
            weight: 600,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/Pretendard-Bold.subset.woff2'],
            weight: 700,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/Pretendard-ExtraBold.subset.woff2'],
            weight: 800,
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--astro-font-mono',
      fallbacks: ['monospace'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk',
      cssVariable: '--astro-font-hero',
      fallbacks: ['sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // TODO: Enable CSP when motion library supports it.
  // Astro's CSP auto-generates style hashes, which causes browsers to ignore
  // 'unsafe-inline'. Since motion and nine-beauty-actress require dynamic
  // inline styles, CSP is incompatible with the current stack.
  // security: { csp: true },
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
});
