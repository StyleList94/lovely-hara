import { fontProviders } from 'astro/config';

export const pretendard = {
  provider: 'local' as const,
  name: 'Pretendard' as const,
  cssVariable: '--font-pretendard' as const,
  variants: [
    {
      weight: 400,
      style: 'normal',
      src: [
        './src/assets/fonts/pretendard/Pretendard-Regular.subset.woff2',
      ] as [string],
    },
    {
      weight: 500,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-Medium.subset.woff2'] as [
        string,
      ],
    },
    {
      weight: 600,
      style: 'normal',
      src: [
        './src/assets/fonts/pretendard/Pretendard-SemiBold.subset.woff2',
      ] as [string],
    },
    {
      weight: 700,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-Bold.subset.woff2'] as [
        string,
      ],
    },
    {
      weight: 800,
      style: 'normal',
      src: [
        './src/assets/fonts/pretendard/Pretendard-ExtraBold.subset.woff2',
      ] as [string],
    },
  ],
};

export const robotoMono = {
  provider: fontProviders.google(),
  name: 'Roboto Mono' as const,
  cssVariable: '--font-roboto-mono' as const,
};

export const titilliumWeb = {
  provider: fontProviders.google(),
  name: 'Titillium Web' as const,
  cssVariable: '--font-titillium-web' as const,
};

export const mozillaText = {
  provider: fontProviders.google(),
  name: 'Mozilla Text' as const,
  weights: [400, 500, 600, 700],
  cssVariable: '--font-mozilla-text' as const,
};
