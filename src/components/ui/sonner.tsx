'use client';

import { type CSSProperties, useEffect, useState } from 'react';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  return 'system';
};

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<ToasterProps['theme']>('system');

  useEffect(() => {
    setTheme(getThemePreference() as ToasterProps['theme']);

    const observer = new MutationObserver(() => {
      const currentTheme = getThemePreference();
      if (currentTheme !== 'system') {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
      } else {
        setTheme(currentTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
