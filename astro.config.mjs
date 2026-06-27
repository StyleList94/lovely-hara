// @ts-check
import { fileURLToPath } from 'node:url';

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
    resolve: {
      // Cloudflare's workerd build applies the `browser` export condition,
      // which resolves jimp to an empty stub (dist/browser/index.js exports {}).
      // Force the esm build that actually exports `Jimp` for the server action.
      // Absolute path bypasses jimp's exports-field encapsulation.
      alias: {
        jimp: fileURLToPath(
          new URL('./node_modules/jimp/dist/esm/index.js', import.meta.url),
        ),
      },
    },
    optimizeDeps: {
      // Dev-only: pre-bundle jimp's CommonJS codec deps so the workerd dev
      // runner receives ESM (with require interop) instead of raw CJS, which
      // otherwise crashes with "require is not defined". The production build
      // already bundles these via rolldown, so this only affects `astro dev`.
      include: ['jimp', 'utif2', 'jpeg-js'],
    },
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
