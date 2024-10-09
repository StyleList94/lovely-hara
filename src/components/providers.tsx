import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider>
    <NextThemesProvider attribute="class">{children}</NextThemesProvider>
  </NextUIProvider>
);

export default AppProvider;
