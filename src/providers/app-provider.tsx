import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <NextThemesProvider attribute="class">{children}</NextThemesProvider>
);

export default AppProvider;
