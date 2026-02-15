'use client';

import { useSyncExternalStore } from 'react';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot(): ToasterProps['theme'] {
  const stored = localStorage.getItem('theme');
  if (stored && stored !== 'system') {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  }
  return 'system';
}

function getServerSnapshot(): ToasterProps['theme'] {
  return 'system';
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot,
  );

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'bg-white text-zinc-950 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-white/10',
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
