'use client';

import { Switch, useMounted } from '@stylelist94/nine-beauty-actress';
import { useEffect, useState, useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('theme-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('theme-update', callback);
  };
};

const getSnapshot = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'system';
};

const getServerSnapshot = (): 'system' => 'system';

const ThemeControlSwitch = () => {
  const isMounted = useMounted();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const handleThemeUpdate = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('theme-update', handleThemeUpdate);
    return () => window.removeEventListener('theme-update', handleThemeUpdate);
  }, []);

  const toggleTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const newTheme: 'light' | 'dark' =
      currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Switch
      isChecked={isDark}
      onCheckedChange={toggleTheme}
      iconClassName="text-zinc-500/80 dark:text-zinc-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-light-mode"
      >
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-dark-mode"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </Switch>
  );
};

export default ThemeControlSwitch;
