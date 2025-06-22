import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import { pretendard, robotoMono, titilliumWeb } from '@/assets/fonts';

import AppProvider from '@/providers/app-provider';

import Toaster from '@/components/ui/sonner';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'StyleList94',
  description: 'FE 유틸리티',
  keywords: ['Utility', '유틸리티'],
  openGraph: {
    title: 'StyleList94',
    description: 'FE 유틸리티',
    type: 'website',
    siteName: 'StyleList94',
    url: 'https://stylelist94.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StyleList94',
    description: 'FE 유틸리티',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${robotoMono.variable} ${titilliumWeb.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
