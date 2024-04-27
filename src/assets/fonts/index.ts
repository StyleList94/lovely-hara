import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const pretendard = localFont({
  src: [
    {
      path: './pretendard/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './pretendard/Pretendard-Medium.subset.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});
