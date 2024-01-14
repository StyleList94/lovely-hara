import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AppProvider from '@/components/AppProvider';

import { dmSans, inter, roboto, robotoMono } from 'app/fonts';

import 'styles/global.css';

export const metadata: Metadata = {
  title: 'Stylish Next App',
  description: 'Whatever you want',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${robotoMono.variable} ${dmSans.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
