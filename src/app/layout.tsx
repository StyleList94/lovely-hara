import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AppProvider from '@/components/AppProvider';

import { dmSans, inter, roboto, robotoMono } from 'app/fonts';

import 'styles/global.css';

export const metadata: Metadata = {
  title: 'StyleList94',
  description: '광안리구미호',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${robotoMono.variable} ${dmSans.variable}`}
    >
      <body className="bg-base-100">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
